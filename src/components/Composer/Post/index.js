import Link from 'next/link';

import { useAppStore } from '../../../store/app';
import { fixUsername, getAvatarUrl } from '../../../utils/helpers';
import Card from '../../UI/Card';

function Post() {
  const profile = useAppStore((state) => state.currentProfile);
  return (
    <Card className={'p-5 space-y-3 !rounded-xl'}>
      <div className={'flex items-center space-x-3'}>
        <Link href={`/user/${profile?.handle}`}>
          <img
            src={getAvatarUrl(profile)}
            loading={'lazy'}
            className={'w-12 h-12 bg-gray-200 rounded-full border'}
            height={40}
            width={40}
            alt={fixUsername(profile?.handle)}
          />
        </Link>
        <button
          className={
            'w-full flex items-center space-x-2 bg-gray-100  px-4 py-2 rounded-full border border-gray-200'
          }
          type={'button'}
        >
          <span className={'text-gray-400'}>
            {`What's on your mind?, ${profile?.handle.replace('.test', '')}`}
          </span>
        </button>
      </div>
    </Card>
  );
}

export default Post;
