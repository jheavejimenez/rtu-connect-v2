import { GridItem, GridLayout } from '../components/UI/GridLayout';
import { useAppStore } from '../store/app';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <GridLayout>
      <GridItem span={12}>
        <h1 className={'text-3xl font-bold text-center'}>{'Welcome to Next.js!'}</h1>
      </GridItem>
    </GridLayout>
  );
}

export default Home;
