import ThreadBody from '../../Publication/ThreadBody';

function Commented({ feedItem }) {
  const publication = feedItem.root;
  const firstComment = feedItem.comments && feedItem.comments[0];

  return firstComment ? (
    <ThreadBody publication={publication} />
  ) : publication?.commentOn ? (
    <ThreadBody publication={publication?.commentOn} />
  ) : null;
}

export default Commented;
