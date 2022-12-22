import { GridLayout } from '../components/UI/GridLayout';
import { useAppStore } from '../store/app';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);

  return <GridLayout />;
}

export default Home;
