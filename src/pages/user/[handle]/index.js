import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import ProfileFeed from '../../../components/Profile/Feed';
import { GridLayout } from '../../../components/UI/GridLayout';
import { GET_PROFILE } from '../../../graphQL/queries/get-profile';
import { useAppStore } from '../../../store/app';

function ViewProfile() {
  const {
    query: { handle }
  } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: {
      profileRequest: {
        handle: handle ?? currentProfile?.handle
      }
    }
  });

  if (error) {
    return <div>{'Error'}</div>;
  }

  // if (loading || !data) {
  //   return <ProfilePageShimmer />;
  // }

  if (!data?.profile) {
    return <div>{'No profile found'}</div>;
  }

  const profile = data?.profile;
  console.log(profile);
  return (
    <GridLayout>
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>{'// user profile here'}</div>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <ProfileFeed profile={profile} />
      </div>
    </GridLayout>
  );
}

export default ViewProfile;
