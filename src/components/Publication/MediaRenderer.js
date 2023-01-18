import { useState } from 'react';

function MediaRenderer({ media, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={'relative'}>
      <img
        src={media}
        alt={'publication'}
        className={'object-cover w-full h-full'}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      {!isLoaded && <div className={'absolute inset-0 bg-gray-100 animate-pulse'} />}
    </div>
  );
}

export default MediaRenderer;
