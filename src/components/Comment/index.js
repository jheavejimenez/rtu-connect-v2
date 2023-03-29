import InfiniteScroll from 'react-infinite-scroll-component';

import { useCommentFeedQuery } from '../../../generated';
import { useAppPersistStore, useAppStore } from '../../store/app';
import { SCROLL_THRESHOLD } from '../../utils/constants';
import NewComment from '../Composer/Comment';
import Queued from '../Publication/Queued';
import SinglePublication from '../Publication/SinglePublication';
import CommentShimmer from '../Shimmer/CommentShimmer';
import Empty from '../UI/Empty';
import ErrorMessage from '../UI/ErrorMesssage';

function ViewComment({ publication }) {
  const publicationId = publication?.__typename === 'Mirror' ? publication?.mirrorOf?.id : publication?.id;
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useAppPersistStore((state) => state.txnQueue);

  const reactionRequest = currentProfile ? { profileId: currentProfile?.id } : null;
  const profileId = currentProfile?.id ?? null;

  const request = {
    commentsOf: publicationId,
    limit: 10
  };

  const { data, loading, error, fetchMore } = useCommentFeedQuery({
    variables: { request, reactionRequest, profileId },
    skip: !publicationId
  });

  const comments = data?.publications?.items ?? [];
  const pageInfo = data?.publications?.pageInfo;
  const hasMore = pageInfo?.next && comments?.length !== pageInfo.totalCount;
  const commentsLength = comments.length;

  const loadMore = async () => {
    await fetchMore({
      variables: { request: { ...request, cursor: pageInfo?.next }, reactionRequest, profileId }
    });
  };

  return (
    <>
      {currentProfile && <NewComment publication={publication} />}
      {loading && <CommentShimmer />}
      {!loading && commentsLength === 0 && <Empty message={<span>{'Be the first one to comment!'}</span>} />}
      <ErrorMessage title={'Failed to load comment feed'} error={error} />
      <InfiniteScroll
        dataLength={commentsLength}
        scrollThreshold={SCROLL_THRESHOLD}
        hasMore={hasMore}
        next={loadMore}
      >
        <div className={'divide-y-[1px]'}>
          {txnQueue.map(
            (txn) =>
              txn?.type === 'new_comment' &&
              txn?.parent === publication?.id && (
                <div key={txn.id}>
                  <Queued txn={txn} />
                </div>
              )
          )}
          {comments?.map((comment, index) => (
            <SinglePublication key={`${publicationId}_${index}`} publication={comment} showType={false} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default ViewComment;
