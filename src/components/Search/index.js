import { useRouter } from 'next/router';

import ErrorMessage from '../UI/ErrorMesssage';
import { GridLayout } from '../UI/GridLayout';
import MetaTags from '../UI/MetaTags';
import Profiles from './Profiles';

function Search() {
  const { query } = useRouter();

  if (!query.q || !['profiles'].includes(query.type)) {
    return <ErrorMessage title={'Invalid search query'} error={new Error('Invalid search query')} />;
  }

  return (
    <>
      <MetaTags title={'Search'} />
      <GridLayout>
        <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mt-16 md:mt-0'}>
          {query.type === 'profiles' && <Profiles query={query.q} />}
        </div>
      </GridLayout>
    </>
  );
}

export default Search;
