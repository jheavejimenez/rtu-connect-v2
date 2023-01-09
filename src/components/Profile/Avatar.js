import { Menu, Transition } from '@headlessui/react';
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';

function Avatar() {
  return (
    <Menu as={'div'} className={'relative inline-block text-left'}>
      <div>
        <Menu.Button
          as={'img'}
          className={'inline-block h-10 w-10 rounded-full ring-2 ring-blue-800'}
          alt={'avatar'}
          src={'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg'}
        />
      </div>
      <Transition
        as={Fragment}
        enter={'transition ease-out duration-100'}
        enterFrom={'transform opacity-0 scale-95'}
        enterTo={'transform opacity-100 scale-100'}
        leave={'transition ease-in duration-75'}
        leaveFrom={'transform opacity-100 scale-100'}
        leaveTo={'transform opacity-0 scale-95'}
      >
        <Menu.Items
          className={
            'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          }
        >
          <div className={'px-1 py-1 '}>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <UserIcon
                    className={'mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-900'}
                    aria-hidden={'true'}
                  />
                  {'Profile'}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <Cog6ToothIcon
                    className={'mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-900'}
                    aria-hidden={'true'}
                  />
                  {'Settings'}
                </button>
              )}
            </Menu.Item>
          </div>
          <div className={'px-1 py-1'}>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <ArrowRightOnRectangleIcon
                    className={'mr-3 h-5 w-5 text-red-400 group-hover:text-red-700'}
                    aria-hidden={'true'}
                  />
                  {'Logout'}
                </button>
              )}
            </Menu.Item>
          </div>
          <div className={'px-1 py-1'}>
            <Menu.Item as={'h3'} className={'group flex w-full items-center rounded-md px-2 py-2 text-sm'}>
              <ExclamationTriangleIcon
                className={'mr-3 h-5 w-5 text-yellow-600 group-hover:text-yellow-700'}
                aria-hidden={'true'}
              />
              {'v-2.1-beta'}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Avatar;
