import { GridLayout } from '../components/UI/GridLayout';
import { useAppStore } from '../store/app';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <GridLayout>
      <h1>{'test '}</h1>
    </GridLayout>
  );
}

export default Home;
