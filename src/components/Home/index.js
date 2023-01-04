import { useAppStore } from '../../store/app';
import { GridLayout } from '../UI/GridLayout';
import BetaWarning from './BetaWarning';
import Feed from './Feed';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return (
    <GridLayout>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <Feed />
      </div>
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>
        <BetaWarning />
      </div>
    </GridLayout>
  );
}

export default Home;
