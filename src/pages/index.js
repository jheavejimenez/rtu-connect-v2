import { Container, Grid, GridItem } from '@chakra-ui/react';

import { useAppStore } from '../store/app';

function Home() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  return (
    <Container mx="auto">
      <Grid column="12">
        <GridItem colSpan="12" bg="orange.300" area={'header'} mb="5">
          {currentProfile ? <>Home feed</> : <>Explore</>}
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Home;
