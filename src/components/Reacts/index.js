import Comment from './Comment';
import Like from './Like';
import Share from './Share';

function Reactions({ publication }) {
  return (
    <span className={'flex gap-6 pt-3 -ml-2 text-gray-500 sm:gap-8'}>
      <Like />
      <Comment />
      <Share />
    </span>
  );
}

export default Reactions;
