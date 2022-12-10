import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

function Modal({ icon, show, children, onClose, title }) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as={'div'} className={'overflow-y-auto fixed inset-0 z-10'} onClose={onClose}>
        <div className={'fixed inset-0 overflow-y-auto'}>
          <Transition.Child
            as={Fragment}
            enter={'ease-out duration-300'}
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave={'ease-in duration-200'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
          >
            <Dialog.Overlay className={'fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity'} />
          </Transition.Child>

          <div className={'fixed inset-0 overflow-y-auto'}>
            <div className={'flex min-h-full items-center justify-center p-4 text-center'}>
              <Transition.Child
                as={Fragment}
                enter={'ease-out duration-300'}
                enterFrom={'opacity-0 scale-95'}
                enterTo={'opacity-100 scale-100'}
                leave={'ease-in duration-200'}
                leaveFrom={'opacity-100 scale-100'}
                leaveTo={'opacity-0 scale-95'}
              >
                <Dialog.Panel
                  className={
                    'w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'
                  }
                >
                  <div className={'flex justify-between items-center py-3.5 px-5 divider'}>
                    <div className={'flex items-center space-x-2 font-bold'}>
                      {icon}
                      <div>{title}</div>
                    </div>
                    <button
                      type={'button'}
                      className={'p-1 text-gray-800 rounded-full  hover:bg-gray-200'}
                      onClick={onClose}
                    >
                      <XCircleIcon className={'w-5 h-5'} />
                    </button>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
