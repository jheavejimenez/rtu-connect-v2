import { useState } from 'react';

import { fixURL } from '../../utils/helpers';

function MediaRenderer({ media, mediaType }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={'relative rounded-l-md my-5'}>
      {mediaType?.includes('video/mp4') ? (
        <iframe class={'w-full aspect-video'} src={media} />
      ) : (
        <img
          src={fixURL(media)}
          loading={'lazy'}
          decoding={'async'}
          className={'object-cover rounded-md w-1/2 h-1/2'}
        />
      )}
    </div>
  );
}

export default MediaRenderer;
