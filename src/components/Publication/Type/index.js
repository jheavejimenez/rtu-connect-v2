import Commented from './Commented';

function PublicationType({ publication, showType, showThread = false }) {
  const type = publication.root.__typename;
  const isCollected = !!publication?.collectedBy;

  console.log(publication);

  if (!showType) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{type === 'Comment' && showThread && !isCollected && <Commented publication={publication} />}</>
  );
}

export default PublicationType;
