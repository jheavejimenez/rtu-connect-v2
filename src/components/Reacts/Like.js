import { useApolloClient, useMutation } from '@apollo/client';
import { HeartIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { CREATE_DOWNVOTE } from '../../graphQL/mutations/create-downvote';
import { CREATE_UPVOTE } from '../../graphQL/mutations/create-upvote';
import { useAppStore } from '../../store/app';
import { publicationKeyFields } from '../../utils/helpers';

function Like({ publication }) {
  const isMirror = publication?.__typename === 'Mirror';
  const currentProfile = useAppStore((state) => state.currentProfile);

  const ReactionTypes = {
    Upvote: 'UPVOTE',
    Downvote: 'DOWNVOTE'
  };

  const [liked, setLiked] = useState(
    (isMirror ? publication?.mirrorOf?.reaction : publication?.reaction) === 'UPVOTE'
  );
  const [count, setCount] = useState(
    isMirror ? publication?.mirrorOf?.stats?.totalUpvotes : publication?.stats?.totalUpvotes
  );

  const { cache } = useApolloClient();

  const updateCache = (type) => {
    cache.modify({
      id: publicationKeyFields(isMirror ? publication?.mirrorOf : publication),
      fields: {
        stats: (stats) => ({
          ...stats,
          totalUpvotes: type === ReactionTypes.Upvote ? stats.totalUpvotes + 1 : stats.totalUpvotes - 1
        })
      }
    });
  };

  const [addReaction] = useMutation(CREATE_UPVOTE, {
    onError: (error) => {
      setLiked(!liked);
      setCount(count - 1);
      toast.error(error.message);
    },
    update: (cache) => updateCache(cache, ReactionTypes.Upvote)
  });

  const [removeReaction] = useMutation(CREATE_DOWNVOTE, {
    onError: (error) => {
      setLiked(!liked);
      setCount(count + 1);
      toast.error(error.message);
    },
    update: (cache) => updateCache(cache, ReactionTypes.Downvote)
  });

  const createLike = () => {
    if (!currentProfile) {
      return toast.error('Please sign in your wallet.');
    }

    const variable = {
      variables: {
        request: {
          profileId: currentProfile?.id,
          reaction: ReactionTypes.Upvote,
          publicationId: publication.__typename === 'Mirror' ? publication?.mirrorOf?.id : publication?.id
        }
      }
    };

    if (liked) {
      setLiked(false);
      setCount(count - 1);
      removeReaction(variable);
    } else {
      setLiked(true);
      setCount(count + 1);
      addReaction(variable);
    }
  };

  return (
    <motion.button whileTap={{ scale: 0.9 }} aria-label={'Like'} onClick={createLike}>
      <span className={'flex items-center space-x-1'}>
        <span className={'p-1.5 rounded-full hover:bg-pink-300 hover:bg-opacity-20'}>
          <HeartIcon
            className={`${liked ? 'text-pink-500' : 'text-blue-500'}
            w-[15px] sm:w-[18px]
          `}
          />
        </span>
        {count > 0 && <span className={'text-[11px] sm:text-xs'}>{count}</span>}
      </span>
    </motion.button>
  );
}

export default Like;
