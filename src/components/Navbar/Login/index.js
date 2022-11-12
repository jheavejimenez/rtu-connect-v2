import { useLazyQuery, useMutation } from '@apollo/client';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useSignMessage } from 'wagmi';

import { AUTHENTICATION, GET_CHALLENGE } from '../../../graphQL/auth/auth-mutations';
import { setLocalStorage } from '../../../utils/helpers';
import Modal from '../../UI/Modal';

function Login() {
  const { connector, isConnected, address } = useAccount();
  const [challenge, { error: challengeError, loading: challengeLoading }] = useLazyQuery(GET_CHALLENGE);
  const [authenticate, { error: authenticateError, loading: authenticateLoading }] =
    useMutation(AUTHENTICATION);
  const { signMessageAsync, isLoading: signLoading } = useSignMessage({
    onError: (error) => {
      console.log('error signing message', error);
    }
  });

  async function handleLogin() {
    try {
      const getChallenge = await challenge({
        variables: { request: { address } }
      });
      if (!getChallenge?.data?.challenge?.text) {
        throw new Error('No challenge found');
      }

      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text
      });

      const auth = await authenticate({
        variables: { request: { address, signature } }
      });
      setLocalStorage(
        ['accessToken', 'refreshToken'],
        auth.data?.authenticate.accessToken,
        auth.data?.authenticate.refreshToken
      );
      console.log('auth', auth.data?.authenticate.accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  return connector?.id ? (
    <Modal isOpen={isConnected} isClose={() => false} title={'Login to RTU Connect'}>
      <button onClick={() => handleLogin()}>{'Disconnect'}</button>
    </Modal>
  ) : (
    <div className={'p-5'}>
      <ConnectKitButton />
    </div>
  );
}

export default Login;
