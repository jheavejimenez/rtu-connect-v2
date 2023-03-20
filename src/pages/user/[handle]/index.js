import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import BetaWarning from '../../../components/Home/BetaWarning';
import Detail from '../../../components/Profile/Detail';
import ProfileFeed from '../../../components/Profile/Feed';
import ErrorMessage from '../../../components/UI/ErrorMesssage';
import { GridLayout } from '../../../components/UI/GridLayout';
import MetaTags from '../../../components/UI/MetaTags';
import { GET_PROFILE } from '../../../graphQL/queries/get-profile';
import { APP_NAME } from '../../../utils/constants';

function ViewProfile() {
  const {
    query: { handle }
  } = useRouter();
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: {
      profileRequest: {
        handle: handle
      },
      skip: !handle
    }
  });

  if (error) {
    return <ErrorMessage title={`Failed to load feed`} error={error} />;
  }

  // if (loading || !data) {
  //   return <ProfilePageShimmer />;
  // }

  if (!data?.profile) {
    return <div>{'No profile found'}</div>;
  }
  const profile = data?.profile;

  return (
    <GridLayout>
      <MetaTags tile={`User ${APP_NAME}`} />
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>
        <Detail profile={profile} />
        <BetaWarning />
      </div>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <ProfileFeed profile={profile} />
      </div>
    </GridLayout>
  );
}

export default ViewProfile;
