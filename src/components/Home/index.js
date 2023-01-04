import { useAppStore } from '../../store/app';
import { GridLayout } from '../UI/GridLayout';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return (
    <GridLayout>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>{'newsfeed here'}</div>
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>{'beta warning here'}</div>
    </GridLayout>
  );
}

export default Home;
