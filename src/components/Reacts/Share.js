import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

import Spinner from '../UI/Spinner';

function Share() {
  const [isLoading, setIsloading] = useState(false);
  const count = 5;
  const mirrored = true;

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
      <span className={(mirrored ? 'text-green-500' : 'text-brand', 'flex items-center space-x-1')}>
        <span
          className={
            (mirrored ? 'hover:bg-green-300' : 'hover:bg-brand-300', 'p-1.5 rounded-full hover:bg-opacity-20')
          }
        >
          {isLoading ? (
            <Spinner variant={mirrored ? 'success' : 'primary'} size={'xs'} />
          ) : (
            <ArrowsRightLeftIcon className={'w-[15px] sm:w-[18px]'} />
          )}
        </span>
        {count > 0 && <span className={'text-[11px] sm:text-xs'}>{count}</span>}
      </span>
    </motion.button>
  );
}

export default Share;