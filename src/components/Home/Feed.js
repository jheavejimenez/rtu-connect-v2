import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';

import { EXPLORE_FEED } from '../../graphQL/queries/explore-feed';
import SinglePublication from '../Publication/SinglePublication';
import Empty from '../UI/Empty';
import Spinner from '../UI/Spinner';

function Feed() {
  const { data, loading, error, fetchMore } = useQuery(EXPLORE_FEED, {
    variables: {
      feedRequest: {
        profileId: '0x492a',
        limit: 10
      }
    }
  });
  const loadMore = async () => {};

  const publications = data?.feed?.items;
  const pageInfo = data?.feed?.pageInfo;

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
        <SinglePublication
          key={`${publication?.root.id}_${index}`}
          feedItem={publication}
          publication={publication}
        />
      ))}
    </InfiniteScroll>
  );
}

export default Feed;
