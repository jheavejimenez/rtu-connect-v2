import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useState } from 'react';

import rtuLogo from '../../logos/rtuLogo.png';
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
        <Button
          icon={<Image className={'mr-0.5 w-4 h-4'} height={16} width={16} src={rtuLogo} alt={'RTU Logo'} />}
          onClick={() => setShowLoginModal(!showLoginModal)}
        >
          {'Login'}
        </Button>
      )}
    </>
  );
}

export default Login;
