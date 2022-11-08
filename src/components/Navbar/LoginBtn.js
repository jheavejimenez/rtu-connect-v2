import { Dialog } from '@headlessui/react';
import { useState } from 'react';

function LoginBtn() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={'relative z-50'}>
        <div className={'fixed inset-0 flex items-center justify-center p-4'}>
          <Dialog.Panel className={'w-full max-w-sm rounded bg-ble'}>
            <Dialog.Title>{'Complete your order'}</Dialog.Title>
            <Dialog.Description>{'You will be redirected to the checkout page.'}</Dialog.Description>
            <button onClick={() => setIsOpen(false)}>{'Cancel'}</button>
          </Dialog.Panel>
        </div>
      </Dialog>
      <button
        className={
          'bg-blue-500 text-white font-semibold rounded-full px-4 py-2 ' +
          'hover:bg-blue-600 transition duration-200 ease-in-out'
        }
        onClick={() => setIsOpen(true)}
      >
        {'Login'}
      </button>
    </>
  );
}

export default LoginBtn;
