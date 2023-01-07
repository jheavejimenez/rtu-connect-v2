import InfiniteScroll from 'react-infinite-scroll-component';

import dummyData from '../../utils/dummyData';
import SinglePublication from '../Publication/SinglePublication';
import Spinner from '../UI/Spinner';

function Feed() {
  const loadMore = async () => {};
  /*
   * note the current publication data is hard coded
   * need to replace with real data
   */
  const publications = dummyData.data.explorePublications.items;
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
