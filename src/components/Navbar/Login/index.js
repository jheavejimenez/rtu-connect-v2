import Image from 'next/image';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { useAuthStore } from '../../../store/auth';
import { APP_NAME } from '../../../utils/constants';
import useLogin from '../../../utils/hooks/useLogin';
import rtuLogo from '../../logos/rtuLogo.png';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import Spinner from '../../UI/Spinner';
import NewProfile from './New/NewProfile';

function Login() {
  const { isConnected } = useAccount();
  const { showLoginFlow, handleLogin } = useLogin();

  const loginRequested = useAuthStore((state) => state.loginRequested);
  const showSignupModal = useAuthStore((state) => state.showSignupModal);
  const setShowSignupModal = useAuthStore((state) => state.setShowSignupModal);
  const signingInProgress = useAuthStore((state) => state.signingInProgress);

  useEffect(() => {
    if (isConnected && loginRequested) {
      handleLogin();
    }
  }, [isConnected]);

  return (
    <>
      <Modal
        title={APP_NAME}
        icon={<Image height={55} width={55} src={rtuLogo} alt={'RTU Logo'} />}
        show={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      >
        <NewProfile />
      </Modal>
      <Button
        disabled={signingInProgress}
        onClick={() => {
          showLoginFlow();
        }}
      >
        {signingInProgress ? <Spinner /> : 'login'}
      </Button>
    </>
  );
}

export default Login;
