function Banner({ title, text }) {
  return (
    <aside
      className={
        'rounded-none sm:rounded-xl border mb-4 bg-blue-200 border border-blue-400 ' +
        'space-y-2.5 text-blue-600 p-5'
      }
    >
      <div className={'flex items-center space-x-2 text-2xl font-bold text-blue-700'}>
        <p>{title}</p>
      </div>
      <p className={'text-base leading-[22px]'}>{text}</p>
    </aside>
  );
}

export default Banner;
