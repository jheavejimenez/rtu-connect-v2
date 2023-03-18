function Detail() {
  return (
    <aside
      className={
        'rounded-none sm:rounded-xl border mb-4 bg-white border border-gray-200 ' +
        'space-y-2.5 p-10 md:w-82px  '
      }
    >
      <div className={'flex flex-col gap-1 text-center items-center'}>
        <img className={'h-28 w-28 bg-white p-2 rounded-full shadow mb-4'} alt={'user avatar'} />
      </div>
      <div className={'flex items-center justify-center'}>
        <span className={'font-semibold'}>{'@testdarell1.rtu'} </span>
      </div>
      <div className={'flex items-center justify-center'}>
        <span className={'text-sm truncate'}>
          {'Wallet Adress: 0x014A0C35D33683BC3e50F18AE669432D7e49A13d'}
        </span>
      </div>
      <div className={'flex justify-center items-center gap-2 my-3'}>
        <div className={'font-semibold text-center mx-4'}>
          <p className={'text-black'}>{' 0'}</p>
          <span className={'text-gray-400'}>{'Followers'}</span>
        </div>
        <div className={'font-semibold text-center mx-4'}>
          <p className={'text-black'}>{'0'}</p>
          <span className={'text-gray-400'}>{'Following'}</span>
        </div>
      </div>
    </aside>
  );
}

export default Detail;
