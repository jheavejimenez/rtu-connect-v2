import { useAppStore } from '../../store/app';
import Comment from './Comment';
import Like from './Like';
import Share from './Share';

function Reactions({ publication, electedMirror }) {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const collectModuleType = publication?.collectModule?.__typename;

  return (
    <span
      className={'flex gap-6 pt-3 -ml-2 text-gray-500 sm:gap-8'}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Like publication={publication} />
      <Comment publication={publication} />
      {collectModuleType !== 'RevertCollectModuleSettings' && (
        <Share publication={publication} electedMirror={electedMirror} />
      )}
    </span>
  );
}

export default Reactions;
