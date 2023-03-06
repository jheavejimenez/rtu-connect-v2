import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';

function Comment({ publication }) {
  const isMirror = publication?.__typename === 'Mirror';
  const commentsCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfComments
    : publication?.stats?.totalAmountOfComments;

  return (
    <motion.button whileTap={{ scale: 0.9 }} aria-label={'Comment'}>
      <Link href={`/posts/${publication?.id}`}>
        <span className={'flex items-center space-x-1 text-blue-500'}>
          <span className={'p-1.5 rounded-full hover:bg-blue-300 hover:bg-opacity-20'}>
            <ChatBubbleLeftIcon className={'w-[15px] sm:w-[18px]'} />
          </span>
          {commentsCount > 0 && <span className={'text-[11px] sm:text-xs'}>{commentsCount}</span>}
        </span>
      </Link>
    </motion.button>
  );
}

export default Comment;
