import ThreadBody from '../ThreadBody';

function Commented({ publication }) {
  const commentOn = publication?.comments[0];
  const mainPost = commentOn?.mainPost;

  console.log();
  return (
    <>
      {mainPost ? <ThreadBody publication={mainPost} /> : null}
      <ThreadBody publication={commentOn} />
    </>
  );
}

export default Commented;
