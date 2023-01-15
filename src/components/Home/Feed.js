import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';

import { EXPLORE_FEED } from '../../graphQL/queries/explore-feed';
import SinglePublication from '../Publication/SinglePublication';
import Empty from '../UI/Empty';
import Spinner from '../UI/Spinner';

function Feed() {
  const explorePublicationsRequest = {
    sortCriteria: 'TOP_COMMENTED',
    publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
    noRandomize: true,
    limit: 10
  };

  const { data, fetchMore } = useQuery(EXPLORE_FEED, {
    variables: { explorePublicationsRequest }
  });

  const publications = data?.explorePublications?.items;
  const pageInfo = data?.explorePublications?.pageInfo;
  const hasMore = pageInfo?.next && publications?.length !== pageInfo.totalCount;

  const loadMore = async () => {
    await fetchMore({
      variables: { request: { ...explorePublicationsRequest, cursor: pageInfo?.next } }
    });
  };

  if (publications?.length === 0) {
    return <Empty message={"You don't follow anyone. Start posting now!"} />;
  }
  return (
    <InfiniteScroll
      dataLength={publications?.length ?? 0}
      scrollThreshold={0.5}
      hasMore={hasMore}
      next={loadMore}
      loader={<Spinner />}
    >
      {publications?.map((publication, index) => (
        <SinglePublication key={`${publication.id}_${index}`} publication={publication} />
      ))}
    </InfiniteScroll>
  );
}

export default Feed;
