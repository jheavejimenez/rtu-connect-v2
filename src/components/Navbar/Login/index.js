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
        title={'RTU Connect'}
        icon={<Image height={55} width={55} src={rtuLogo} alt={'RTU Logo'} />}
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
