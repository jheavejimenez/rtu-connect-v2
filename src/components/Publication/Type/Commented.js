import ThreadBody from '../ThreadBody';

function Commented({ publication }) {
  const mainPost = publication?.mainPost;

  console.log(publication);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{mainPost ? <ThreadBody publication={mainPost} /> : null}</>;
}

export default Commented;
