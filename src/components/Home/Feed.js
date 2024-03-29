import InfiniteScroll from 'react-infinite-scroll-component';

import { useTimelineQuery } from '../../../generated';
import { useAppPersistStore, useAppStore } from '../../store/app';
import { SCROLL_THRESHOLD } from '../../utils/constants';
import Queued from '../Publication/Queued';
import SinglePublication from '../Publication/SinglePublication';
import FeedShimmer from '../Shimmer/FeedShimmer';
import Empty from '../UI/Empty';
import ErrorMessage from '../UI/ErrorMesssage';

function Feed() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useAppPersistStore((state) => state.txnQueue);
  const profileId = currentProfile?.id ?? null;

  const request = {
    profileId,
    limit: 10
  };

  const reactionRequest = currentProfile ? { profileId } : null;

  const { data, loading, error, fetchMore } = useTimelineQuery({
    variables: { request, reactionRequest, profileId }
  });

  const publications = data?.feed?.items;
  const pageInfo = data?.feed?.pageInfo;
  const hasMore = pageInfo?.next && publications?.length !== pageInfo.totalCount;
  const loadMore = async () => {
    const loadedIds = new Set();
    const updateQuery = (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }
      const newData = fetchMoreResult.feed.items.filter((item) => !loadedIds.has(item.id));
      for (const item of newData) {
        loadedIds.add(item.id);
      }
      return {
        feed: {
          ...fetchMoreResult.feed,
          items: [...prev.feed.items, ...newData]
        }
      };
    };
    if (!hasMore) {
      return;
    }
    await fetchMore({
      variables: {
        request: {
          ...request,
          cursor: pageInfo?.next
        },
        reactionRequest,
        profileId
      },
      updateQuery
    });
  };

  if (loading) {
    return <FeedShimmer />;
  }
  if (publications?.length === 0) {
    return <Empty message={"You don't follow anyone. Start posting now!"} />;
  }
  if (error) {
    return <ErrorMessage title={`Failed to load feed`} error={error} />;
  }
  return (
    <InfiniteScroll
      dataLength={publications?.length ?? 0}
      scrollThreshold={SCROLL_THRESHOLD}
      hasMore={hasMore}
      next={loadMore}
      loader={
        <div className={'flex justify-center mt-5'}>
          <span className={'text-gray-500 animate-pulse'}>{'Loading...'}</span>
        </div>
      }
      endMessage={
        <div className={'flex justify-center mt-5'}>
          <p className={'text-gray-500'}>{'You have seen it all'}</p>
        </div>
      }
    >
      {txnQueue.map(
        (txn) =>
          txn?.type === 'new_post' && (
            <div key={txn.id}>
              <Queued txn={txn} />
            </div>
          )
      )}
      {publications?.map((publication, index) => (
        <SinglePublication
          key={`${publication?.root.id}_${index}`}
          feedItem={publication}
          publication={publication.root}
        />
      ))}
    </InfiniteScroll>
  );
}

export default Feed;
