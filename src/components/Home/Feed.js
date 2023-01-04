import { publications } from '../../utils/helpers';
import SinglePublication from '../Publication/SinglePublication';

function Feed() {
  /*
   * note the current publication data is hard coded
   * need to replace with real data
   */
  return (
    <div className={'divide-y-[1px] dark:divide-gray-700/80'}>
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
