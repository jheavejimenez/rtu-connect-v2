import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';

import { GET_PUBLICATIONS } from '../../graphQL/queries/get-publications';
import { useAppStore } from '../../store/app';
import { SCROLL_THRESHOLD } from '../../utils/constants';
import SinglePublication from '../Publication/SinglePublication';
import FeedShimmer from '../Shimmer/FeedShimmer';
import Empty from '../UI/Empty';
import ErrorMessage from '../UI/ErrorMesssage';

function ViewComment({ publication }) {
  const publicationId = publication?.__typename === 'Mirror' ? publication?.mirrorOf?.id : publication?.id;
  const currentProfile = useAppStore((state) => state.currentProfile);

  const reactionsRequest = currentProfile ? { profileId: currentProfile?.id } : null;
  const profileId = currentProfile?.id ?? null;

  const publicationsRequest = {
    commentsOf: publicationId,
    limit: 10
  };
  const { data, loading, error, fetchMore } = useQuery(GET_PUBLICATIONS, {
    variables: { publicationsRequest, reactionsRequest },
    skip: !publicationId
  });

  const comments = data?.publications?.items ?? [];
  const pageInfo = data?.publications?.pageInfo;
  const hasMore = pageInfo?.next && comments?.length !== pageInfo.totalCount;
  const commentsLength = comments.length;

  const loadMore = async () => {
    await fetchMore({
      variables: { request: { ...publicationsRequest, cursor: pageInfo?.next }, reactionsRequest, profileId }
    });
  };

  return (
    <>
      {/*{currentProfile && <NewComment publication={publication} />}*/}
      {loading && <FeedShimmer />}
      {!loading && commentsLength === 0 && <Empty message={<span>{'Be the first one to comment!'}</span>} />}
      <ErrorMessage title={'Failed to load comment feed'} error={error} />
      <InfiniteScroll
        dataLength={commentsLength}
        scrollThreshold={SCROLL_THRESHOLD}
        hasMore={hasMore}
        next={loadMore}
      >
        <div className={'divide-y-[1px]'}>
          {comments?.map((comment, index) => (
            <SinglePublication key={`${publicationId}_${index}`} publication={comment} showType={false} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default ViewComment;
