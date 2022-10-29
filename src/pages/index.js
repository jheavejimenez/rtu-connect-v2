import { useAppStore } from '../store/app';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default Home;
