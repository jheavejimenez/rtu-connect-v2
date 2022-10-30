import { useAppStore } from '../store/app';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return <h1>{'hello'}</h1>;
}

export default Home;
