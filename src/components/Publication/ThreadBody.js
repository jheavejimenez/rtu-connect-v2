import { useRouter } from 'next/router';

import UserProfile from '../Profile';
import Reactions from '../Reacts';
import PublicationBody from './PublicationBody';

function ThreadBody({ publication }) {
  const { push } = useRouter();
  const isMirror = publication.__typename === 'Mirror';
  const profile = isMirror ? publication?.mirrorOf?.profile : publication?.profile;
  const timestamp = isMirror ? publication?.mirrorOf?.createdAt : publication?.createdAt;

  return (
    <article>
      <div className={'flex justify-between space-x-1.5'}>
        <span onClick={(event) => event.stopPropagation()}>
          <UserProfile profile={profile ?? publication?.collectedBy?.defaultProfile} />
        </span>
        <span className={'text-xs text-gray-500'}>{dayjs(new Date(timestamp)).fromNow()}</span>
      </div>
      <div className={'flex'}>
        <div className={'mr-8 ml-5 bg-gray-300 border-gray-300 border-[0.8px] -my-[3px]'} />
        <div className={'pt-4 pb-5 !w-[85%] sm:w-full'} onClick={() => push(`/posts/${publication?.id}`)}>
          <PublicationBody publication={publication} />
          <Reactions publication={publication} />
        </div>
      </div>
    </article>
  );
}

export default ThreadBody;
