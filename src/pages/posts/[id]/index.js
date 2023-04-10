import { useRouter } from 'next/router';

import { usePublicationQuery } from '../../../../generated';
import ViewComment from '../../../components/Comment';
import BetaWarning from '../../../components/Home/BetaWarning';
import UserProfile from '../../../components/Profile';
import BlockchainTransaction from '../../../components/Publication/BlockchainTransaction';
import Publication from '../../../components/Publication/Publication';
import PublicationPageShimmer from '../../../components/Shimmer/PublicationPageShimmer';
import Card from '../../../components/UI/Card';
import { GridLayout } from '../../../components/UI/GridLayout';
import MetaTags from '../../../components/UI/MetaTags';
import { useAppStore } from '../../../store/app';
import { APP_NAME } from '../../../utils/constants';

function ViewPublication() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const {
    query: { id }
  } = useRouter();

  const { data, loading, error } = usePublicationQuery({
    variables: {
      request: { publicationId: id },
      reactionRequest: currentProfile ? { profileId: currentProfile?.id } : null,
      profileId: currentProfile?.id ?? null
    },
    skip: !id
  });

  const publication = data?.publication;

  if (loading || !data) {
    return <PublicationPageShimmer />;
  }

  if (error) {
    return <div>{'Error'}</div>;
  }

  if (!publication) {
    return <div>{'No publication found'}</div>;
  }

  return (
    <GridLayout>
      <MetaTags title={`Post ${APP_NAME}`} />
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mt-16 md:mt-0'}>
        <Card className={'!rounded-xl'}>
          <Publication publication={publication} />
        </Card>
        <ViewComment publication={publication} />
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
        <BlockchainTransaction publication={publication} />
      </div>
    </GridLayout>
  );
}

export default ViewPublication;
