import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

import Modal from '../../UI/Modal';
import NewProfile from './New/NewProfile';
import WalletConnect from './WalletConnect';

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
        {hasProfile ? <WalletConnect setHasProfile={setHasProfile} /> : <NewProfile />}
      </Modal>
      {openConnectModal ? (
        <button onClick={openConnectModal}>{'Connect Wallet'}</button>
      ) : (
        <button
          className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
          onClick={() => setShowLoginModal(!showLoginModal)}
        >
          {'Login'}
        </button>
      )}
    </>
  );
}

export default Login;
