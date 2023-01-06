import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';

import Card from '../UI/Card';

function Suggested() {
  return null;
}

function RecommendedProfile() {
  return (
    <Card className={'!rounded-xl'}>
      <h3 className={'font-bold p-3 text-gray-800'}>{'Who to follow'}</h3>
      <aside>
        <div className={'space-y-4 p-5'}>
          {/*<ErrorMessage title="Failed to load recommendations" error={error} />*/}
          {/*{data?.recommendedProfiles?.slice(0, 5)?.map((profile) => (*/}
          {/*  <div key={profile?.id} className="truncate">*/}
          {/*    <UserProfile profile={profile as Profile} isFollowing={profile.isFollowedByMe} showFollow />*/}
          {/*  </div>*/}
          {/*))}*/}
        </div>
        <button
          className={
            'bg-gray-50 hover:bg-gray-100 border-t text-sm w-full rounded-b-xl text-left px-5 py-3 flex items-center space-x-2 text-gray-600'
          }
          type={'button'}
        >
          <EllipsisHorizontalCircleIcon className={'h-4 w-4'} />
          <span>{'Show more'}</span>
        </button>
      </aside>
    </Card>
  );
}

export default RecommendedProfile;
