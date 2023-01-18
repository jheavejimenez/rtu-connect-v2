import { useState } from 'react';

import { fixURL } from '../../utils/helpers';

function MediaRenderer({ media, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={'relative rounded-l-md my-5'}>
      <img
        src={fixURL(media)}
        loading={'lazy'}
        decoding={'async'}
        className={'object-cover rounded-md w-1/2 h-1/2'}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      {!isLoaded && <div className={'absolute inset-0 bg-gray-100 animate-pulse'} />}
    </div>
  );
}

export default MediaRenderer;
