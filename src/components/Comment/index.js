import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppStore } from '../../store/app';
import dummyData from '../../utils/dummyData';
import SinglePublication from '../Publication/SinglePublication';
import Card from '../UI/Card';

function ViewComment({ publication }) {
  const publicationId = publication?.__typename === 'Mirror' ? publication?.mirrorOf?.id : publication?.id;
  const currentProfile = useAppStore((state) => state.currentProfile);
  const loadMore = async () => {};
  const comments = dummyData.data.explorePublications.items;
  return (
    <>
      {/*{currentProfile ? canComment ? <NewComment publication={publication} /> : <CommentWarning /> : null}*/}
      {/*{loading && <PublicationsShimmer />}*/}
      {/*{!loading && totalComments === 0 && (*/}
      {/*  <EmptyState*/}
      {/*    message={<span>Be the first one to comment!</span>}*/}
      {/*    icon={<CollectionIcon className="w-8 h-8 text-brand" />}*/}
      {/*  />*/}
      {/*)}*/}
      {/*<ErrorMessage title="Failed to load comment feed" error={error} />*/}
      {/*{!error && !loading && totalComments !== 0 && (*/}
      <InfiniteScroll dataLength={10} scrollThreshold={50} hasMore={true} next={true}>
        <Card className={'divide-y-[1px]'}>
          {comments?.map((comment, index) => (
            <SinglePublication key={`${index}`} publication={comment} />
          ))}
        </Card>
      </InfiniteScroll>
    </>
  );
}

export default ViewComment;
