import { useAppStore } from '../../store/app';
import { APP_NAME } from '../../utils/constants';
import NewPublication from '../Composer/Post';
import ExploreFeed from '../Explore/Feed';
import Banner from '../UI/Banner';
import { GridLayout } from '../UI/GridLayout';
import MetaTags from '../UI/MetaTags';
import BetaWarning from './BetaWarning';
import HomeFeed from './Feed';
import RecommendedProfile from './RecommendedProfile';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return (
    <GridLayout>
      <MetaTags title={APP_NAME} />
      <div className={'mt-16 md:mt-0 space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        {currentProfile ? (
          <>
            <NewPublication />
            <HomeFeed />
          </>
        ) : (
          <>
            <Banner
              title={`👋 Welcome to ${APP_NAME}`}
              text={
                'A decentralize social media for Rizal Technological University built with Lens Protocol 🌿'
              }
            />
            <ExploreFeed feedType={'LATEST'} />
          </>
        )}
      </div>
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>
        <BetaWarning />
        <RecommendedProfile />
      </div>
    </GridLayout>
  );
}

export default Home;
