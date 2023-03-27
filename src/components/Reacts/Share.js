import { useApolloClient, useMutation } from '@apollo/client';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { splitSignature } from 'ethers/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useContractWrite, useSignTypedData } from 'wagmi';

import { BROADCAST_TRANSACTION } from '../../graphQL/mutations/broadcast-transaction';
import { CREATE_MIRROR } from '../../graphQL/mutations/create-mirror';
import { useAppStore } from '../../store/app';
import LensHubProxy from '../../utils/abis/LensHubProxy.json';
import { LENS_HUB_MUMBAI } from '../../utils/constants';
import { getSignature } from '../../utils/helpers';
import Spinner from '../UI/Spinner';

function Share({ publication, electedMirror }) {
  const isMirror = publication?.__typename === 'Mirror';
  const mirrorCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
    : publication?.stats?.totalAmountOfMirrors;

  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);

  const [mirrored, setMirrored] = useState(
    isMirror ? publication?.mirrorOf?.mirrors?.length > 0 : publication?.mirrors?.length > 0
  );

  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const { cache } = useApolloClient();

  const updateCache = () => {
    cache.modify({
      id: isMirror ? publication?.mirrorOf : publication,
      fields: {
        stats: (stats) => ({
          ...stats,
          totalAmountOfMirrors: stats.totalAmountOfMirrors + 1
        })
      }
    });
  };

  const { isLoading: writeLoading, write } = useContractWrite({
    address: LENS_HUB_MUMBAI,
    abi: LensHubProxy,
    functionName: 'mirrorWithSig',
    mode: 'recklesslyUnprepared',
    onError: (error) => {
      toast(`Error sharing post: ${error.message}`);
    }
  });

  const [broadcast, { loading: broadcastLoading }] = useMutation(BROADCAST_TRANSACTION, {
    onCompleted: () => {
      setMirrored(true);
      toast.success('Post shared successfully');
    },
    update: updateCache
  });

  const [createMirrorTypedData, { loading: typedDataLoading }] = useMutation(CREATE_MIRROR, {
    onCompleted: async ({ createMirrorTypedData }) => {
      const { id, typedData } = createMirrorTypedData;
      const {
        profileId,
        profileIdPointed,
        pubIdPointed,
        referenceModule,
        referenceModuleData,
        referenceModuleInitData,
        deadline
      } = typedData.value;
      const signature = await signTypedDataAsync(getSignature(typedData));
      const { v, r, s } = splitSignature(signature);
      const sig = { v, r, s, deadline };
      const inputStruct = {
        profileId,
        profileIdPointed,
        pubIdPointed,
        referenceModule,
        referenceModuleData,
        referenceModuleInitData,
        sig
      };
      setUserSigNonce(userSigNonce + 1);
      const { data } = await broadcast({ variables: { request: { id, signature } } });
      if (data?.broadcast.__typename === 'RelayError') {
        return write?.({ recklesslySetUnpreparedArgs: [inputStruct] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const createMirror = async () => {
    if (!currentProfile) {
      return toast.error('Please connect your wallet');
    }

    try {
      const request = {
        profileId: currentProfile?.id,
        publicationId: publication?.id,
        referenceModule: {
          followerOnlyReferenceModule: false
        }
      };

      return await createMirrorTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request
        }
      });
    } catch {
      toast.error('Error creating mirror');
    }
  };

  const isLoading = typedDataLoading || signLoading || writeLoading || broadcastLoading;

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={createMirror}
      disabled={isLoading}
      aria-label={'Mirror'}
    >
      <span className={'text-blue-500 flex items-center space-x-1'}>
        <span
          className={
            mirrored ? 'hover:bg-green-300' : 'hover:bg-blue-300 p-1.5 rounded-full hover:bg-opacity-20'
          }
        >
          {isLoading ? (
            <Spinner variant={mirrored ? 'success' : 'primary'} size={'xs'} />
          ) : (
            <ArrowPathRoundedSquareIcon className={'w-[15px] sm:w-[18px]'} />
          )}
        </span>
        {mirrorCount > 0 && <span className={'text-[11px] sm:text-xs'}>{mirrorCount}</span>}
      </span>
    </motion.button>
  );
}

export default Share;
