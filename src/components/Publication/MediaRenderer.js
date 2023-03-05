import 'plyr-react/plyr.css';

import Plyr from 'plyr-react';

import { ALLOWED_VIDEO_TYPES } from '../../utils/constants';
import { getNFTStorageLink } from '../../utils/helpers';

function MediaRenderer({ media, mediaType }) {
  const src = getNFTStorageLink(media);
  return (
    <div className={'relative rounded-l-md my-5'}>
      {ALLOWED_VIDEO_TYPES.includes(mediaType) ? (
        <div className={'rounded-lg'}>
          <Plyr
            source={{
              type: 'video',
              sources: [{ src, provider: 'html5' }]
            }}
            options={{
              controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
              ratio: '16:12'
            }}
          />
        </div>
      ) : (
        <img
          src={src}
          alt={`Media ${mediaType} can't be displayed`}
          loading={'lazy'}
          decoding={'async'}
          className={'object-cover rounded-md w-1/2 h-1/2'}
        />
      )}
    </div>
  );
}

export default MediaRenderer;
