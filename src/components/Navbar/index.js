import Avatar from './Avatar';

function NavBar() {
  return (
    <div className={'NavBar'}>
      <nav className={'sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'}>
        <div className={'flex justify-between mx-10 items-center w-full'}>
          <div className={'flex items-center'}>
            <a href={'/'} className={'mr-3'}>
              {'RTU'}
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
              <span>{'Home'}</span>
            </li>
            <li className={'mx-4'}>
              <span>{'Explore'}</span>
            </li>
            <li className={'mx-4'}>
              <span>{'watch'}</span>
            </li>
          </ul>
          <Avatar />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
