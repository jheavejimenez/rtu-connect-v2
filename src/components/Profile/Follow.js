import { useMutation } from '@apollo/client';
import { splitSignature } from 'ethers/lib/utils';
import toast from 'react-hot-toast';
import { useAccount, useContractWrite, useSignTypedData } from 'wagmi';

import { BROADCAST_TRANSACTION } from '../../graphQL/mutations/broadcast-transaction';
import { CREATE_FOLLOW } from '../../graphQL/mutations/create-follow';
import { CREATE_PROXY_FOLLOW } from '../../graphQL/mutations/create-proxy-follow';
import { useAppStore } from '../../store/app';
import LensHubProxy from '../../utils/abis/LensHubProxy.json';
import { LENS_HUB_MUMBAI } from '../../utils/constants';
import { getSignature } from '../../utils/helpers';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';

function Follow({ profile }) {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);

  const { address } = useAccount();
  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const { isLoading: writeLoading, write } = useContractWrite({
    address: LENS_HUB_MUMBAI,
    abi: LensHubProxy,
    functionName: 'followWithSig',
    mode: 'recklesslyUnprepared',
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const [broadcast, { loading: broadcastLoading }] = useMutation(BROADCAST_TRANSACTION, {
    onSuccess: () => {
      toast.success('Followed successfully');
    }
  });

  const updateCache = (cache) => {
    cache.modify({
      id: `Profile:${profile?.id}`,
      fields: {
        stats: (stats) => ({
          ...stats,
          totalFollowers: stats.totalFollowers + 1
        }),
        isFollowedByMe: () => true
      }
    });
  };
  const [createFollowProxyAction, { loading: proxyActionLoading }] = useMutation(CREATE_PROXY_FOLLOW, {
    onCompleted: async () => {
      toast.success(`Followed successfully!`);
    },
    update: updateCache
  });

  const [createFollowTypedData, { loading: typedDataLoading }] = useMutation(CREATE_FOLLOW, {
    onCompleted: async ({ createFollowTypedData }) => {
      const { id, typedData } = createFollowTypedData;
      const { deadline } = typedData.value;
      const signature = await signTypedDataAsync(getSignature(JSON.parse(JSON.stringify(typedData))));
      setUserSigNonce(userSigNonce + 1);
      const { profileIds, datas: followData } = typedData.value;
      const { v, r, s } = splitSignature(signature);
      const sig = { v, r, s, deadline };
      const inputStruct = {
        follower: address,
        profileIds,
        datas: followData,
        sig
      };
      const { data } = await broadcast({ variables: { request: { id, signature } } });
      if (data?.broadcast.__typename === 'RelayError') {
        return write?.({ recklesslySetUnpreparedArgs: [inputStruct] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    update: updateCache
  });

  const createViaProxyAction = async (variables) => {
    const { data } = await createFollowProxyAction({
      variables
    });
    if (!data?.proxyAction) {
      await createFollowTypedData({
        variables: {
          request: { follow: [{ profile: profile?.id }] },
          options: { overrideSigNonce: userSigNonce }
        }
      });
    }
  };

  const createFollow = async () => {
    if (!currentProfile) {
      toast.error('Please login to follow');
      return;
    }

    try {
      if (profile?.followModule) {
        await createFollowTypedData({
          variables: {
            options: { overrideSigNonce: userSigNonce },
            request: {
              follow: [
                {
                  profile: profile?.id,
                  followModule:
                    profile?.followModule?.__typename === 'ProfileFollowModuleSettings'
                      ? { profileFollowModule: { profileId: currentProfile?.id } }
                      : null
                }
              ]
            }
          }
        });
      } else {
        await createViaProxyAction({
          request: {
            follow: {
              freeFollow: {
                profileId: profile?.id
              }
            }
          }
        });
      }
    } catch {
      toast.error('Failed to follow');
    }
  };

  const createUnfollow = async () => {
    toast.error('Unfollow not implemented yet');
  };

  const isLoading = typedDataLoading || signLoading || writeLoading || broadcastLoading || proxyActionLoading;
  return !profile?.isFollowedByMe ? (
    <Button onClick={createFollow} disabled={isLoading} loading={isLoading}>
      {isLoading ? <Spinner /> : 'Follow'}
    </Button>
  ) : (
    <Button
      onClick={createUnfollow}
      disabled={isLoading}
      loading={isLoading}
      className={
        '!bg-red-500 hover:!bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
      }
    >
      {isLoading ? <Spinner /> : 'Unfollow'}
    </Button>
  );
}

export default Follow;
