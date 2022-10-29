import { Grid, GridItem } from '@chakra-ui/react';

import { useAppStore } from '../store/app';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return (
    <div className="container mx-auto max-w-screen-xl flex-grow py-8 px-0 sm:px-5">
      <Grid column="12">
        <GridItem colSpan="12" bg="orange.300" area={'header'} mb="5">
          {currentProfile ? <>Home feed</> : <>Explore</>}
        </GridItem>
      </Grid>
    </div>
  );
}

export default Home;
