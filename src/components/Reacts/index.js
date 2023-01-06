import Comment from './Comment';
import Like from './Like';
import Share from './Share';

function Reactions() {
  return (
    <span className={'justify-center items-center flex gap-6 pt-3 -ml-2 text-gray-500 sm:gap-8'}>
      <Like />
      <Comment />
      <Share />
    </span>
  );
}

export default Reactions;
