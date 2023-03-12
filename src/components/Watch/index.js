import BetaWarning from '../Home/BetaWarning';
import RecommendedProfile from '../Home/RecommendedProfile';
import { GridLayout } from '../UI/GridLayout';
import WatchFeed from './Feed';

function Watch() {
  return (
    <GridLayout>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <WatchFeed />
      </div>
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>
        <BetaWarning />
        <RecommendedProfile />
      </div>
    </GridLayout>
  );
}

export default Watch;
