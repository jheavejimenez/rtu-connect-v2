import { Dialog } from '@headlessui/react';
import { useState } from 'react';

function LoginBtn() {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={'relative z-50'}>
      <div className={'fixed inset-0 flex items-center justify-center p-4'}>
        <Dialog.Panel className={'w-full max-w-sm rounded bg-white'}>
          <Dialog.Title>{'Complete your order'}</Dialog.Title>

          {/* ... */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default LoginBtn;
