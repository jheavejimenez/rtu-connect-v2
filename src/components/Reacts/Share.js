import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

import Spinner from '../UI/Spinner';

function Share({ publication, electedMirror }) {
  const [isLoading, setIsloading] = useState(false);
  const [count, setCount] = useState(0);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const isUnknownCollect = publication?.collectModule.__typename === 'UnknownCollectModuleSettings';
  const isMirror = publication.__typename === 'Mirror';
  const hasCollected = isMirror ? publication?.mirrorOf?.hasCollectedByMe : publication?.hasCollectedByMe;

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
            (isMirror ? 'hover:bg-green-300' : 'hover:bg-blue-300', 'p-1.5 rounded-full hover:bg-opacity-20')
          }
        >
          {isLoading ? (
            <Spinner variant={isMirror ? 'success' : 'primary'} size={'xs'} />
          ) : (
            <ArrowPathRoundedSquareIcon className={'w-[15px] sm:w-[18px]'} />
          )}
        </span>
        {count > 0 && <span className={'text-[11px] sm:text-xs'}>{count}</span>}
      </span>
    </motion.button>
  );
}

export default Share;
