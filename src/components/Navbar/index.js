import { BellIcon } from '@heroicons/react/24/outline';

import Avatar from './Avatar';

function NavBar() {
  return (
    <nav
      className={
        'bg-white h-max md:h-14 w-full ' +
        'shadow flex flex-col md:flex-row ' +
        'items-center justify-center md:justify-between' +
        ' fixed top-0 z-50 border-b'
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
        <li className={'w-1/5 md:w-max text-center'}>
          <div
            className={
              'w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer ' +
              'text-center inline-block rounded text-gray-600' +
              ' hover:bg-gray-100 relative'
            }
          >
            {'Home'}
          </div>
        </li>
        <li className={'w-1/5 md:w-max text-center'}>
          <div
            className={
              'w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer ' +
              'text-center inline-block rounded text-gray-600' +
              ' hover:bg-gray-100 relative'
            }
          >
            {'community'}
          </div>
        </li>
        <li className={'w-1/5 md:w-max text-center hidden md:inline-block'}>
          <div
            className={
              'w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer ' +
              'text-center inline-block rounded text-gray-600' +
              ' hover:bg-gray-100 relative'
            }
          >
            {'live'}
          </div>
        </li>
      </ul>
      <ul className={'hidden md:flex mx-4 items-center justify-center'}>
        <li className={'mx-4'}>
          <div
            className={
              'rounded-full text-xl grid place-items-center bg-gray-200 ' +
              'mx-1 p-3 cursor-pointer hover:bg-gray-300 relative'
            }
          >
            <BellIcon className={'h-6 w-6'} />
            <span
              className={
                'text-xs absolute top-0 right-0 bg-red-500 text-white font-semibold rounded-full px-1 text-center'
              }
            >
              {'9'}
            </span>
          </div>
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;