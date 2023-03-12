import Commented from './Commented';
import Shared from './Shared';

function PublicationType({ publication, showType, showThread = false }) {
  const type = publication?.__typename;
  const isCollected = !!publication?.collectedBy;

  if (!showType) {
    return null;
  }

  return (
    <span onClick={(event) => event.stopPropagation()}>
      {type === 'Mirror' && <Shared publication={publication} />}
      {type === 'Comment' && showThread && !isCollected && <Commented publication={publication} />}
    </span>
  );
}

export default PublicationType;
