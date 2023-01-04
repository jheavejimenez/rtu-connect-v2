import { HeartIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';

function Like() {
  const count = 5;
  return (
    <motion.button whileTap={{ scale: 0.9 }} aria-label={'Like'}>
      <span className={'flex items-center space-x-1 text-pink-500'}>
        <span className={'p-1.5 rounded-full hover:bg-pink-300 hover:bg-opacity-20'}>
          <HeartIcon className={'w-[15px] sm:w-[18px]'} />
        </span>
        {count > 0 && <span className={'text-[11px] sm:text-xs'}>{count}</span>}
      </span>
    </motion.button>
  );
}

export default Like;
