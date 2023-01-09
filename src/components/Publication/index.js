import RecommendedProfile from '../Home/RecommendedProfile';
import UserProfile from '../Profile';
import Card from '../UI/Card';
import { GridLayout } from '../UI/GridLayout';
import Publication from './Publication';

function ViewPublication() {
  return (
    <GridLayout>
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>
        <Card>
          <Publication publication={publication} />
        </Card>
        {/*<Feed publication={publication} />*/}
      </div>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <Card as={'aside'} className={'p-5'}>
          <UserProfile
            profile={
              publication.__typename === 'Mirror' ? publication?.mirrorOf?.profile : publication?.profile
            }
            showBio
          />
        </Card>
        <RecommendedProfile publication={publication} />
      </div>
    </GridLayout>
  );
}
