import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAppStore } from '../../store/app';
import rtuLogo from '../logos/rtuLogo.png';
import SvgCommunity from '../logos/SvgCommunity';
import SvgHome from '../logos/SvgHome';
import SvgWatch from '../logos/SvgWatch';
import Avatar from '../Profile/Avatar';
import Login from './Login';
import NavItems from './NavItems';

function NavBar() {
  const { pathname } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);

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
        <div className={'mr-3 mt-1 md:inline-block cursor-pointer'}>
          <Image
            src={rtuLogo}
            alt={'rtu logo'}
            className={'w-auto h-auto rounded-full'}
            width={35}
            height={35}
          />
        </div>
        <div className={'flex items-stretch justify-center space-x-1 w-full h-full'}>
          <div
            className={
              'relative bg-gray-200 h-full w-full' +
              ' xl:w-max xl:pl-3 xl:pr-8 rounded-full' +
              ' flex items-center justify-center cursor-pointer'
            }
          >
            <button className={'outline-none focus:outline-none'} />
            <MagnifyingGlassIcon className={'pl-3 h-8 w-8 text-gray-500'} />
            <input
              className={
                'w-full pt-2 pl-2 pb-2 text-sm text-black outline-none focus:outline-none bg-transparent'
              }
              placeholder={'Search RTUConnect'}
              type={'search'}
            />
          </div>
        </div>
      </div>
      <ul className={'flex w-full lg:w-max items-center justify-evenly'}>
        <NavItems url={'/'} current={pathname === '/'} logo={<SvgHome />} />
        <NavItems url={'/explore'} current={pathname === '/explore'} logo={<SvgCommunity />} />
        <NavItems url={'/watch'} current={pathname === '/watch'} logo={<SvgWatch />} />
        <Bars3Icon className={'h-6 w-max md:hidden md:disabled text-gray-600'} />
      </ul>
      <ul className={'hidden md:flex mx-4 items-center justify-center'}>
        <li className={'mx-4'}>{!currentProfile ? <Login /> : <Avatar profile={currentProfile} />}</li>
      </ul>
    </nav>
  );
}

export default NavBar;
