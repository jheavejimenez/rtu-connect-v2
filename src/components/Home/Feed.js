import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';

import { EXPLORE_FEED } from '../../graphQL/queries/explore-feed';
import { useAppStore } from '../../store/app';
import { SCROLL_THRESHOLD } from '../../utils/constants';
import SinglePublication from '../Publication/SinglePublication';
import Empty from '../UI/Empty';
import Spinner from '../UI/Spinner';

function Feed() {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const explorePublicationsRequest = {
    sortCriteria: 'TOP_COMMENTED',
    publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
    noRandomize: true,
    limit: 10
  };
  const profileId = currentProfile?.id ?? null;

  const { data, fetchMore } = useQuery(EXPLORE_FEED, {
    variables: { explorePublicationsRequest }
  });

  const publications = data?.explorePublications?.items;
  const pageInfo = data?.explorePublications?.pageInfo;
  const hasMore = pageInfo?.next && publications?.length !== pageInfo.totalCount;

  const loadMore = async () => {
    const loadedIds = new Set();
    const updateQuery = (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }
      const newData = fetchMoreResult.explorePublications.items.filter((item) => !loadedIds.has(item.id));
      for (const item of newData) {
        loadedIds.add(item.id);
      }
      return {
        explorePublications: {
          ...fetchMoreResult.explorePublications,
          items: [...prev.explorePublications.items, ...newData]
        }
      };
    };
    if (!hasMore) {
      return;
    }
    await fetchMore({
      variables: {
        explorePublicationsRequest: {
          ...explorePublicationsRequest,
          cursor: pageInfo?.next
        },
        profileId
      },
      updateQuery
    });
  };

  if (publications?.length === 0) {
    return <Empty message={"You don't follow anyone. Start posting now!"} />;
  }

  return (
    <InfiniteScroll
      dataLength={publications?.length ?? 0}
      scrollThreshold={SCROLL_THRESHOLD}
      hasMore={hasMore}
      next={loadMore}
      loader={
        <div className={'flex justify-center mt-5'}>
          <Spinner />
        </div>
      }
      endMessage={
        <div className={'flex justify-center mt-5'}>
          <p className={'text-gray-500'}>{'You have seen it all'}</p>
        </div>
      }
    >
      {publications?.map((publication, index) => (
        <SinglePublication key={`${publication.id}_${index}`} publication={publication} />
      ))}
    </InfiniteScroll>
  );
}

export default Feed;
