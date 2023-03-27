import { useMutation } from '@apollo/client';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useContractWrite, useSignTypedData } from 'wagmi';

import { BROADCAST_TRANSACTION } from '../../graphQL/mutations/broadcast-transaction';
import { useAppStore } from '../../store/app';
import LensHubProxy from '../../utils/abis/LensHubProxy.json';
import { LENS_HUB_MUMBAI } from '../../utils/constants';
import Spinner from '../UI/Spinner';

function Share({ publication, electedMirror }) {
  const isMirror = publication?.__typename === 'Mirror';
  const mirrorCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
    : publication?.stats?.totalAmountOfMirrors;

  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);

  const [isLoading, setIsloading] = useState(false);

  const [mirrored, setMirrored] = useState(
    isMirror ? publication?.mirrorOf?.mirrors?.length > 0 : publication?.mirrors?.length > 0
  );

  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const updateCache = (cached) => {
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

  const { write } = useContractWrite({
    address: LENS_HUB_MUMBAI,
    abi: LensHubProxy,
    functionName: 'mirrorWithSig',
    mode: 'recklesslyUnprepared',
    onSuccess: () => {
      toast('Post shared!');
    },
    onError: (error) => {
      toast(`Error sharing post: ${error.message}`);
    }
  });

  const [broadcast, { loading: broadcastLoading }] = useMutation(BROADCAST_TRANSACTION, {
    onCompleted: () => {
      setMirrored(true);
      toast.success('Mirrored!');
    },
    update: updateCache
  });

  function createMirror() {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }

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
            isMirror ? 'hover:bg-green-300' : 'hover:bg-blue-300 p-1.5 rounded-full hover:bg-opacity-20'
          }
        >
          {isLoading ? (
            <Spinner variant={isMirror ? 'success' : 'primary'} size={'xs'} />
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
