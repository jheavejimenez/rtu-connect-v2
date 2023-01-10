import InfiniteScroll from 'react-infinite-scroll-component';

import dummyData from '../../utils/dummyData';
import SinglePublication from '../Publication/SinglePublication';
import Empty from '../UI/Empty';
import Spinner from '../UI/Spinner';

function Feed() {
  const loadMore = async () => {};
  /*
   * note the current publication data is hard coded
   * need to replace with real data
   */
  const publications = dummyData.data.explorePublications.items;
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
          key={`${publication?.id}_${index}`}
          feedItem={publication}
          publication={publication}
        />
      ))}
    </InfiniteScroll>
  );
}

export default Feed;
