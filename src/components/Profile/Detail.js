import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { useAppPersistStore } from '../../store/app';
import { VERIFIED_PROFILES } from '../../utils/constants';
import { fixUsername, getAvatarUrl } from '../../utils/helpers';
import Follow from './Follow';

function Detail({ profile }) {
  const profileId = useAppPersistStore((state) => state.profileId);

  return (
    <aside
      className={
        'rounded-none sm:rounded-xl border mt-16 md:mt-0 mb-4 bg-white border border-gray-200 ' +
        'space-y-2.5 p-10 md:w-82px  '
      }
    >
      <div className={'flex flex-col gap-1 text-center items-center'}>
        <img
          className={'h-28 w-28 bg-white p-2 rounded-full mb-4'}
          src={getAvatarUrl(profile)}
          alt={fixUsername(profile?.handle)}
        />
      </div>
      <div className={'flex items-center justify-center'}>
        <span className={'text-md'}>{fixUsername(profile?.name) ?? fixUsername(profile?.handle)}</span>
        {VERIFIED_PROFILES.includes(profile?.id) && <CheckCircleIcon className={'w-4 h-4 text-blue-700'} />}
      </div>
      <div className={'flex items-center justify-center'}>
        {profile?.ownedBy !== undefined ? (
          <span className={'text-sm text-gray-400'}>{`Wallet Address: ${profile?.ownedBy.slice(
            0,
            6
          )}...${profile?.ownedBy.slice(-4)}`}</span>
        ) : (
          <span className={'text-sm animate-pulse text-blue-900'}>{'...loading'}</span>
        )}
      </div>
      <div className={'flex justify-center items-center gap-2 my-3'}>
        <div className={'font-semibold text-center mx-4'}>
          <p className={'text-black'}>{profile?.stats?.totalFollowers}</p>
          <span className={'text-gray-400'}>{'Followers'}</span>
        </div>
        <div className={'font-semibold text-center mx-4'}>
          <p className={'text-black'}>{profile?.stats?.totalFollowing}</p>
          <span className={'text-gray-400'}>{'Following'}</span>
        </div>
      </div>
      <div className={'flex items-center justify-center pt-3'}>
        {profileId !== profile.id && <Follow profile={profile} />}
      </div>
      {profile?.bio && (
        <div className={'flex items-center justify-center p-3'}>
          <span className={'text-sm text-gray-400 whitespace-pre-wrap break-words'}>{profile?.bio}</span>
        </div>
      )}
    </aside>
  );
}

export default Detail;
