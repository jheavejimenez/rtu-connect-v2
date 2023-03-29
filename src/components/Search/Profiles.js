import InfiniteScroll from 'react-infinite-scroll-component';

import { useSearchProfilesQuery } from '../../../generated';
import { SCROLL_THRESHOLD } from '../../utils/constants';
import UserProfile from '../Profile';
import ProfileShimmer from '../Shimmer/ProfileShimmer';
import Card from '../UI/Card';
import Empty from '../UI/Empty';
import ErrorMessage from '../UI/ErrorMesssage';

function Profiles({ query }) {
  const request = {
    query,
    type: 'PROFILE',
    customFilters: ['GARDENERS'],
    limit: 10
  };

  const { data, loading, error, fetchMore } = useSearchProfilesQuery({
    variables: { request },
    skip: !query
  });

  const search = data?.search;
  const profiles = search?.items;
  const pageInfo = search?.pageInfo;
  const hasMore = pageInfo?.next && profiles?.length !== pageInfo.totalCount;

  const loadMore = async () => {
    const loadedIds = new Set();
    const updateQuery = (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }
      const newData = fetchMoreResult.data.items.filter((item) => !loadedIds.has(item.id));
      for (const item of newData) {
        loadedIds.add(item.id);
      }
      return {
        data: {
          ...fetchMoreResult.data,
          items: [...prev.data.items, ...newData]
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
        }
      },
      updateQuery
    });
  };

  if (loading) {
    return <ProfileShimmer />;
  }

  if (profiles?.length === 0) {
    return <Empty message={`No profiles for &ldquo;${query}&rdquo;`} />;
  }

  if (error) {
    return <ErrorMessage title={`Failed to load profiles`} error={error} />;
  }

  return (
    <InfiniteScroll
      dataLength={profiles?.length}
      scrollThreshold={SCROLL_THRESHOLD}
      hasMore={hasMore}
      next={loadMore}
      loader={
        <div className={'flex justify-center mt-5'}>
          <span className={'text-gray-500 animate-pulse'}>{'Loading...'}</span>
        </div>
      }
    >
      <div className={'space-y-3'}>
        {profiles?.map((profile) => (
          <Card key={profile?.id} className={'p-5'}>
            <UserProfile profile={profile} />
          </Card>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default Profiles;
