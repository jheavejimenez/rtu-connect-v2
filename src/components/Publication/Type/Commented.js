import ThreadBody from '../ThreadBody';

function Commented({ publication }) {
  const commentOn = publication?.commentOn;
  const mainPost = commentOn?.mainPost;

  return (
    <>
      {mainPost ? <ThreadBody publication={mainPost} /> : null}
      <ThreadBody publication={commentOn} />
    </>
  );
}

export default Commented;
