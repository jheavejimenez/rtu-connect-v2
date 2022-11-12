import { ConnectKitButton } from 'connectkit';

import SvgCommunity from '../logos/SvgCommunity';
import SvgHome from '../logos/SvgHome';
import SvgWatch from '../logos/SvgWatch';
import NavItems from './NavItems';

function NavBar() {
  return (
    <nav
      className={
        'bg-white h-max md:h-14 w-full ' +
        'shadow flex flex-col md:flex-row ' +
        'items-center justify-center md:justify-between ' +
        'fixed top-0 z-50 border-b'
      }
    >
      <div className={'flex items-center justify-between w-full md:w-max px-4 py-2'}>
        <div className={'mr-2 hidden md:inline-block cursor-pointer'}>
          <img src={'http///....'} alt={'rtu logo'} className={'w-24 h-auto rounded-full'} />
        </div>
        <div className={'flex items-center justify-between space-x-1'}>
          <div
            className={
              'relative bg-gray-100 sm:w-11 sm:h-11' +
              ' lg:h-10 lg:w-10 xl:w-max xl:pl-3 xl:pr-8 rounded-full' +
              ' flex items-center justify-center cursor-pointer'
            }
          >
            <button className={'outline-none focus:outline-none'} />
            <input
              className={'w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent'}
              placeholder={'Search'}
              type={'search'}
            />
          </div>
        </div>
      </div>
      <ul className={'flex w-full lg:w-max items-center justify-center'}>
        <NavItems url={'/'} active={true} logo={<SvgHome />} />
        <NavItems url={'/community'} active={false} logo={<SvgCommunity />} />
        <NavItems url={'/watch'} active={false} logo={<SvgWatch />} />
      </ul>
      <ul className={'hidden md:flex mx-4 items-center justify-center'}>
        <li className={'mx-4'}>
          <ConnectKitButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
