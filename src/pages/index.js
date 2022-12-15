import { useAppStore } from '../store/app';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
}

export default Home;
