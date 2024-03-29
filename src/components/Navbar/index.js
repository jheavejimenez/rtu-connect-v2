import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppStore } from '../../store/app';
import rtuLogo from '../logos/rtuLogo.png';
import SvgCommunity from '../logos/SvgCommunity';
import SvgHome from '../logos/SvgHome';
import SvgWatch from '../logos/SvgWatch';
import Avatar from '../Profile/Avatar';
import Login from './Login';
import NavItems from './NavItems';
import Search from './Search';

function NavBar() {
  const { pathname } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <nav
      className={
        'bg-white h-28 md:h-14 w-full ' +
        'shadow flex flex-col md:flex-row ' +
        'items-center justify-center md:justify-between ' +
        'fixed top-0 z-50 border-b'
      }
    >
      <div className={'flex items-center justify-between w-full md:w-max px-4 py-2'}>
        <div className={'mr-3 mt-1 md:inline-block cursor-pointer'}>
          <Link href={'/'}>
            <Image
              src={rtuLogo}
              alt={'rtu logo'}
              className={'w-auto h-auto rounded-full'}
              width={35}
              height={35}
            />
          </Link>
        </div>
        <div className={'justify-start w-full h-full pr-16 md:px-0'}>
          <div
            className={
              'relative bg-gray-200 h-full w-[95%] ' +
              ' rounded-full flex items-center justify-center cursor-pointer'
            }
          >
            <button className={'outline-none focus:outline-none'} />
            <MagnifyingGlassIcon className={'pl-3 h-8 w-8 text-gray-500'} />
            <Search />
          </div>
        </div>
      </div>
      <ul className={'flex w-full md:w-max items-center justify-evenly md:justify-center'}>
        <NavItems url={'/'} current={pathname === '/'} logo={<SvgHome />} />
        <NavItems url={'/explore'} current={pathname === '/explore'} logo={<SvgCommunity />} />
        <NavItems url={'/watch'} current={pathname === '/watch'} logo={<SvgWatch />} />
      </ul>
      <div
        className={
          'absolute h-fit top-3 right-0 md:relative md:top-0 md:w-fit w-22 mr-3 flex items-center justify-center'
        }
      >
        <div className={'mx-2 w-full'}>
          {!currentProfile ? <Login /> : <Avatar profile={currentProfile} />}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
