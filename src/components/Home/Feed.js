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
  console.log(publications);
  return (
    <InfiniteScroll
      dataLength={publications?.length ?? 0}
      scrollThreshold={50}
      hasMore={false}
      next={loadMore}
      loader={<Spinner />}
    >
      <div className={'divide-y-[1px] rounded-none sm:rounded-xl border bg-white'}>
        {publications?.map((publication, index) => (
          <SinglePublication
            key={`${publication?.id}_${index}`}
            feedItem={publication}
            publication={publication}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default Feed;
