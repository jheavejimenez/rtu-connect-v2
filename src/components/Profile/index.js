import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

function UserProfile({ profile }) {
  return (
    <div className={'flex justify-between items-center'}>
      <Link href={`/u/${profile?.handle}`}>
        <div className={'flex items-center space-x-3'}>
          <img
            src={'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg'}
            loading={'lazy'}
            className={('w-12 h-12', 'bg-gray-200 rounded-full border')}
            height={40}
            width={40}
            alt={profile?.handle}
          />
          <div>
            <div className={'flex gap-1 items-center max-w-sm truncate'}>
              <div className={'text-md'}>{profile?.name ?? profile?.handle}</div>
              <CheckCircleIcon className={'w-4 h-4 text-blue-700'} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserProfile;
