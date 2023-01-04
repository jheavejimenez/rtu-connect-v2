import { publications } from '../../utils/helpers';
import SinglePublication from '../Publication/SinglePublication';

function Feed() {
  /*
   * note the current publication data is hard coded
   * need to replace with real data
   */
  return (
    <div className={'divide-y-[1px] rounded-none sm:rounded-xl border bg-white'}>
      {publications?.map((publication, index) => (
        <SinglePublication
          key={`${publication?.id}_${index}`}
          feedItem={publication}
          publication={publication}
        />
      ))}
    </div>
  );
}

export default Feed;
