import { useQuery } from '@apollo/client';
import { ErrorMessage } from 'formik';
import InfiniteScroll from 'react-infinite-scroll-component';

import { TestProfileFeedQuery } from '../../graphQL/queries/test-profile-feed-query';
import { useAppStore } from '../../store/app';
import { SCROLL_THRESHOLD } from '../../utils/constants';
import SinglePublication from '../Publication/SinglePublication';
import FeedShimmer from '../Shimmer/FeedShimmer';
import Empty from '../UI/Empty';

function ProfileFeed({ profile }) {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const feedRequest = {
    publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
    limit: 20
  };
  const profileId = currentProfile?.id ?? null;
  const reactionRequest = currentProfile ? { profileId: currentProfile?.id } : null;

  const { data, fetchMore, loading, error } = useQuery(TestProfileFeedQuery);
  const publications = data?.publications?.items;
  const pageInfo = data?.publications?.pageInfo;
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
        feedRequest: {
          ...feedRequest,
          cursor: pageInfo?.next
        },
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
  console.log('publications', data);
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
      {publications?.map((publication, index) => (
        <SinglePublication key={`${publication.id}_${index}`} publication={publication} />
      ))}
    </InfiniteScroll>
  );
}

export default ProfileFeed;
