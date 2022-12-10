import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import ConnectToLens from './ConnectToLens';
import NewProfile from './New/NewProfile';

function Login() {
  const [hasProfile, setHasProfile] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { openConnectModal } = useConnectModal();

  return (
    <>
      <Modal
        title={'RTU'}
        icon={<ArrowRightCircleIcon className={'w-5 h-5'} />}
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        {hasProfile ? <ConnectToLens setHasProfile={setHasProfile} /> : <NewProfile />}
      </Modal>
      {openConnectModal ? (
        <button onClick={openConnectModal}>{'Connect Wallet'}</button>
      ) : (
        <Button onClick={() => setShowLoginModal(!showLoginModal)}>{'Login'}</Button>
      )}
    </>
  );
}

export default Login;
