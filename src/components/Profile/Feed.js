import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PROFILE_FEED } from '../../graphQL/queries/profile-feed';
import { useAppStore } from '../../store/app';
import { SCROLL_THRESHOLD } from '../../utils/constants';
import SinglePublication from '../Publication/SinglePublication';
import FeedShimmer from '../Shimmer/FeedShimmer';
import Empty from '../UI/Empty';
import ErrorMessage from '../UI/ErrorMesssage';

function ProfileFeed({ profile }) {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const profileId = currentProfile?.id;
  const request = { profileId, limit: 50 };

  const { data, fetchMore, loading, error } = useQuery(PROFILE_FEED, {
    variables: { request }
  });

  const publications = data?.feed?.items;
  const pageInfo = data?.feed?.pageInfo;
  const hasMore = pageInfo?.next && publications?.length !== pageInfo.totalCount;
  const loadMore = async () => {};

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
        <SinglePublication
          key={`${publication?.root.id}_${index}`}
          feedItem={publication}
          publication={publication.root}
        />
      ))}
    </InfiniteScroll>
  );
}

export default ProfileFeed;
