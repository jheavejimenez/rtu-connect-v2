import { ConnectKitButton } from 'connectkit';
import { useAccount, useDisconnect } from 'wagmi';

import Modal from '../../UI/Modal';

function Dialog(props) {
  return null;
}

function Login() {
  const { connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // function handleLogin() {
  //   try {
  //     const getChallenge =
  //   }
  // }
  return connector?.id ? (
    <Modal isOpen={isConnected} isClose={() => false} title={'Login to RTU Connect'}>
      <button onClick={() => disconnect()}>{'Disconnect'}</button>
    </Modal>
  ) : (
    <div className={'p-5'}>
      <ConnectKitButton />
    </div>
  );
}

export default Login;
