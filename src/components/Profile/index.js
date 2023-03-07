import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { VERIFIED_PROFILES } from '../../utils/constants';
import { fixUsername, getAvatarUrl } from '../../utils/helpers';

function UserProfile({ profile }) {
  return (
    <div className={'flex justify-between items-center'}>
      <Link href={`/user/${profile?.handle}`}>
        <div className={'flex items-center space-x-3'}>
          <img
            src={getAvatarUrl(profile)}
            loading={'lazy'}
            className={'w-12 h-12 bg-gray-200 rounded-full border'}
            height={40}
            width={40}
            alt={fixUsername(profile?.handle)}
          />
          <div>
            <div className={'flex gap-1 items-center max-w-sm truncate'}>
              <div className={'text-md'}>{fixUsername(profile?.name) ?? fixUsername(profile?.handle)}</div>
              {VERIFIED_PROFILES.includes(profile?.id) && (
                <CheckCircleIcon className={'w-4 h-4 text-blue-700'} />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserProfile;
