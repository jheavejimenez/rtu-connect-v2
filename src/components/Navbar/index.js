function NavBar() {
  return (
    <div className={'NavBar'}>
      <nav
        className={
          'bg-white h-max md:h-14 w-full' +
          ' shadow flex flex-col md:flex-row items-center' +
          ' justify-center md:justify-between fixed top-0 z-50 border-b'
        }
      >
        <div className={'flex justify-between mx-10 items-center w-full'}>
          <div className={'flex items-center'}>
            <a href={'/'} className={'mr-3'}>
              RTU LOGO
            </a>
            <div className={'flex ml-2 items-center rounded-full bg-gray-100 p-2'}>
              <button className={'outline-none focus:outline-none'} />
              <input
                className={'w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent'}
                placeholder={'Search'}
                type={'search'}
              />
            </div>
          </div>
          <ul className={'flex justify-center items-center'}>
            <li className={'mx-4'}>
              <span>home</span>
            </li>
            <li className={'mx-4'}>
              <span>community</span>
            </li>
            <li className={'mx-4'}>
              <span>watch</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
