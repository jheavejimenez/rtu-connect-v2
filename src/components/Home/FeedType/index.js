import Shared from '../../Publication/Type/Shared';
import Commented from './Commented';

function HomeFeedType({ feedItem, showType, showThread = false }) {
  const publication = feedItem.root;
  const isComment = publication.__typename === 'Comment';
  const commentsCount = feedItem.comments?.length ?? 0;

  if (!showType) {
    return null;
  }

  return (
    <span onClick={(event) => event.stopPropagation()}>
      {feedItem.mirrors.length && !isComment ? <Shared publication={publication} /> : null}
      {(isComment || commentsCount > 0) && showThread && <Commented feedItem={feedItem} />}
    </span>
  );
}

export default HomeFeedType;
