import InfiniteScroll from 'react-infinite-scroll-component';

import { useProfileFeedQuery } from '../../../generated';
import { useAppStore } from '../../store/app';
import { SCROLL_THRESHOLD } from '../../utils/constants';
import SinglePublication from '../Publication/SinglePublication';
import FeedShimmer from '../Shimmer/FeedShimmer';
import Empty from '../UI/Empty';
import ErrorMessage from '../UI/ErrorMesssage';

function ProfileFeed({ profile }) {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const request = {
    profileId: profile?.id,
    publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
    limit: 32
  };

  const reactionRequest = currentProfile ? { profileId: currentProfile?.id } : null;
  const profileId = currentProfile?.id ?? null;

  const { data, loading, error, fetchMore } = useProfileFeedQuery({
    variables: { request, reactionRequest, profileId },
    skip: !profile?.id
  });

  const publications = data?.publications?.items;
  const pageInfo = data?.publications?.pageInfo;
  const hasMore = pageInfo?.next && publications?.length !== pageInfo.totalCount;

  // const hasMore = pageInfo?.next && publications?.length < 1;

  const loadMore = async () => {
    const loadedIds = new Set();
    const updateQuery = (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }
      const newData = fetchMoreResult.publications.items.filter((item) => !loadedIds.has(item.id));
      for (const item of newData) {
        loadedIds.add(item.id);
      }
      return {
        publications: {
          ...fetchMoreResult.publications,
          items: [...prev.publications.items, ...newData]
        }
      };
    };
    if (!hasMore) {
      return;
    }
    await fetchMore({
      variables: { request: { ...request, cursor: pageInfo?.next }, reactionRequest, profileId },
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
      {publications?.map((publication, index) => (
        <SinglePublication key={`${publication.id}_${index}`} publication={publication} />
      ))}
    </InfiniteScroll>
  );
}

export default ProfileFeed;
