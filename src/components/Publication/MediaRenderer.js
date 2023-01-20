import { useState } from 'react';

import { fixURL } from '../../utils/helpers';

function MediaRenderer({ media, mediaType }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={'relative rounded-l-md my-5'}>
      {mediaType?.includes('video/mp4') ? (
        <div className={'rounded-lg'}>
          <iframe className={'w-full aspect-[1/2] md:aspect-square'} src={media} />
        </div>
      ) : (
        <img
          src={fixURL(media)}
          alt={'media'}
          loading={'lazy'}
          decoding={'async'}
          className={'object-cover rounded-md w-1/2 h-1/2'}
        />
      )}
    </div>
  );
}

export default MediaRenderer;
