import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';

import { EXPLORE_FEED } from '../../graphQL/queries/explore-feed';
import SinglePublication from '../Publication/SinglePublication';
import Empty from '../UI/Empty';
import Spinner from '../UI/Spinner';

function Feed() {
  const { data } = useQuery(EXPLORE_FEED, {
    variables: {
      explorePublicationsRequest: {
        sortCriteria: 'TOP_COMMENTED',
        publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
        noRandomize: true,
        limit: 20
      }
    }
  });
  const loadMore = async () => {};

  const publications = data?.explorePublications?.items;
  const pageInfo = data?.explorePublications?.pageInfo;
  // const hasMore = pageInfo?.next && publications?.length !== pageInfo.totalCount;

  if (publications?.length === 0) {
    return <Empty message={"You don't follow anyone. Start posting now!"} />;
  }
  return (
    <InfiniteScroll
      dataLength={publications?.length ?? 0}
      scrollThreshold={50}
      hasMore={false}
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
