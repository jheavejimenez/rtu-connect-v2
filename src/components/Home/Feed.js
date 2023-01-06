import InfiniteScroll from 'react-infinite-scroll-component';

import { publications } from '../../utils/helpers';
import SinglePublication from '../Publication/SinglePublication';
import Spinner from '../UI/Spinner';

function Feed() {
  const loadMore = async () => {};
  /*
   * note the current publication data is hard coded
   * need to replace with real data
   */
  console.log(publications.items);
  return (
    <InfiniteScroll
      dataLength={publications?.length ?? 0}
      scrollThreshold={50}
      hasMore={false}
      next={loadMore}
      loader={<Spinner />}
    >
      <div className={'divide-y-[1px] rounded-none sm:rounded-xl border bg-white'}>
        {publications.items?.map((publication, index) => (
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
