import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import BetaWarning from '../../../components/Home/BetaWarning';
import UserProfile from '../../../components/Profile';
import Publication from '../../../components/Publication/Publication';
import Card from '../../../components/UI/Card';
import { GridLayout } from '../../../components/UI/GridLayout';
import { GET_PUBLICATION } from '../../../graphQL/queries/get-publication';
import { useAppStore } from '../../../store/app';

function ViewPublication() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const {
    query: { id }
  } = useRouter();

  const { data, loading, error } = useQuery(GET_PUBLICATION, {
    variables: {
      publicationRequest: {
        publicationId: id
      },
      profileId: currentProfile?.id ?? null
    },
    skip: !id
  });

  const publication = data?.publication;

  if (loading || !data) {
    return <div>{'Loading...'}</div>;
  }

  if (error) {
    return <div>{'Error'}</div>;
  }

  if (!publication) {
    return <div>{'No publication found'}</div>;
  }

  return (
    <GridLayout>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <Card className={'!rounded-xl'}>
          <Publication publication={publication} />
        </Card>
        {/*<ViewComment />*/}
      </div>
      <div className={'space-y-5 lg:col-span-4 md:col-span-12 col-span-12'}>
        <aside className={'p-5 divide-y-[1px] rounded-none sm:rounded-xl border bg-white'}>
          <UserProfile
            profile={
              publication.__typename === 'Mirror' ? publication?.mirrorOf?.profile : publication?.profile
            }
          />
        </aside>
        <BetaWarning />
      </div>
    </GridLayout>
  );
}

export default ViewPublication;
