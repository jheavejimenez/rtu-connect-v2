import { useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useState } from 'react';

import { APP_NAME } from '../../../utils/constants';
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
        title={APP_NAME}
        icon={<Image height={55} width={55} src={rtuLogo} alt={'RTU Logo'} />}
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        {hasProfile ? <ConnectToLens setHasProfile={setHasProfile} /> : <NewProfile />}
      </Modal>
      {openConnectModal ? (
        <Button onClick={openConnectModal}>{'Connect Wallet'}</Button>
      ) : (
        <Button onClick={() => setShowLoginModal(!showLoginModal)}>{'Login'}</Button>
      )}
    </>
  );
}

export default Login;
