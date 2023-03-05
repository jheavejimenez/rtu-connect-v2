import { getNFTStorageLink } from '../../utils/helpers';

function MediaRenderer({ media, mediaType }) {
  return (
    <div className={'relative rounded-l-md my-5'}>
      {mediaType?.includes('video/mp4') ? (
        <div className={'rounded-lg'}>
          <iframe
            className={'w-full aspect-[1/2] md:aspect-square'}
            autoPlay={false}
            muted={false}
            src={media}
          />
        </div>
      ) : (
        <img
          src={getNFTStorageLink(media)}
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
