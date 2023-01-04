import { useRouter } from 'next/router';

import PublicationBody from './PublicationBody';

function SinglePublication({ publication }, props) {
  const { push } = useRouter();
  const isMirror = publication.__typename === 'Mirror';
  const firstComment = props.feedItem?.comments && props.feedItem.comments[0];
  const rootPublication = props.feedItem ? (firstComment ? firstComment : props.feedItem?.root) : publication;
  const profile = props.feedItem
    ? rootPublication.profile
    : isMirror
    ? publication?.mirrorOf?.profile
    : publication?.profile;
  const timestamp = props.feedItem
    ? rootPublication.createdAt
    : isMirror
    ? publication?.mirrorOf?.createdAt
    : publication?.createdAt;

  return (
    <article
      className={
        'hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer first:rounded-t-xl last:rounded-b-xl p-5'
      }
    >
      <div className={'flex justify-between pb-4 space-x-1.5'}>
        <span onClick={(event) => event.stopPropagation()}>
          {'user profile'}
          {/*<UserProfile profile={profile ?? publication?.collectedBy?.defaultProfile} />*/}
        </span>
        <span className={'text-xs text-gray-500'}>{'2 mins ago'}</span>
      </div>
      <div className={'ml-[53px]'} onClick={() => push(`/posts/${rootPublication?.id}`)}>
        <PublicationBody publication={rootPublication} />
      </div>
    </article>
  );
}

export default SinglePublication;
