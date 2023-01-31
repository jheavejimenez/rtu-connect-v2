import { useAppStore } from '../../store/app';
import Post from '../Composer/Post';
import { GridLayout } from '../UI/GridLayout';
import BetaWarning from './BetaWarning';
import Feed from './Feed';
import RecommendedProfile from './RecommendedProfile';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return (
    <GridLayout>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        {currentProfile && <Post />}
        <Feed />
      </div>
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>
        <BetaWarning />
        <RecommendedProfile />
      </div>
    </GridLayout>
  );
}

export default Home;
