import ProfileShimmer from './ProfileShimmer';

function PublicationShimmer() {
  return (
    <div className={'p-5 space-y-4 bg-gray-100 rounded-2xl animate-pulse'}>
      <div className={'flex justify-between'}>
        <ProfileShimmer />
        <div className={'w-1/12 h-3 rounded-lg bg-gray-300 animate-pulse'} />
      </div>
      <div className={'space-y-4 ml-[52px]'}>
        <div className={'space-y-2'}>
          <div className={'w-8/12 h-3 rounded-lg bg-gray-300 animate-pulse'} />
          <div className={'w-7/12 h-3 rounded-lg bg-gray-300 animate-pulse'} />
          <div className={'w-1/3 h-3 rounded-lg bg-gray-300 animate-pulse'} />
        </div>
        <div className={'flex gap-7 pt-3'}>
          <div className={'w-5 h-5 rounded-lg bg-gray-300 animate-pulse'} />
          <div className={'w-5 h-5 rounded-lg bg-gray-300 animate-pulse'} />
          <div className={'w-5 h-5 rounded-lg bg-gray-300 animate-pulse'} />
        </div>
      </div>
    </div>
  );
}

export default PublicationShimmer;
