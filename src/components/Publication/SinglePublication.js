import moment from 'moment/moment';
import { useRouter } from 'next/router';

import UserProfile from '../Profile';
import Reactions from '../Reacts';
import PublicationBody from './PublicationBody';
import PublicationType from './Type';

function SinglePublication({ publication, feedItem, showType = true, showThread = true }) {
  const { push } = useRouter();
  const isMirror = publication.__typename === 'Mirror';
  const firstComment = feedItem?.comments && feedItem.comments[0];
  const rootPublication = feedItem ? (firstComment ? firstComment : feedItem?.root) : publication;
  const profile = feedItem
    ? rootPublication.profile
    : isMirror
    ? publication?.mirrorOf?.profile
    : publication?.profile;
  const timestamp = feedItem
    ? rootPublication.createdAt
    : isMirror
    ? publication?.mirrorOf?.createdAt
    : publication?.createdAt;

  return (
    <article
      className={'hover:bg-gray-100 cursor-pointer rounded-none sm:rounded-xl border bg-white mb-3.5 p-5'}
      onClick={() => push(`/posts/${rootPublication?.id}`)}
    >
      <PublicationType publication={publication} showType={showType} showThread={showThread} />
      <div className={'flex justify-between pb-4 space-x-1.5'}>
        <span onClick={(event) => event.stopPropagation()}>
          <UserProfile profile={profile ?? publication?.collectedBy?.defaultProfile} />
        </span>
        <span className={'text-xs text-gray-500'}>{moment(timestamp).fromNow()}</span>
      </div>
      <div className={'ml-[53px]'}>
        <PublicationBody publication={rootPublication} />
        <Reactions publication={rootPublication} />
      </div>
    </article>
  );
}

export default SinglePublication;
