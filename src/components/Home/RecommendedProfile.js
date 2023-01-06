import DummyRecommendedProfiles from '../../utils/DummyRecommendedProfile.json';
import UserProfile from '../Profile';
import Card from '../UI/Card';

function RecommendedProfile() {
  const profiles = DummyRecommendedProfiles;
  return (
    <Card className={'!rounded-xl'}>
      <h3 className={'font-bold p-3 text-gray-800'}>{'Who to follow'}</h3>
      <aside>
        <div className={'space-y-4 p-5'}>
          {/*<ErrorMessage title="Failed to load recommendations" error={error} />*/}
          {profiles.data?.recommendedProfiles?.slice(0, 5)?.map((profile) => (
            <div key={profile?.id} className={'truncate'}>
              <UserProfile profile={profile} isFollowing={profile.isFollowedByMe} showFollow />
            </div>
          ))}
          {/*))}*/}
        </div>
      </aside>
    </Card>
  );
}

export default RecommendedProfile;
