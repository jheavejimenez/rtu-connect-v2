function ProfileShimmer() {
  return (
    <div className={'flex justify-between items-center py-1'}>
      <div className={'flex items-center space-x-3'}>
        <div className={'w-10 h-10 rounded-full shimmer'} />
        <div className={'space-y-3'}>
          <div className={'w-28 h-3 rounded-lg shimmer'} />
          <div className={'w-20 h-3 rounded-lg shimmer'} />
        </div>
      </div>
    </div>
  );
}

export default ProfileShimmer;
