import { useLazyQuery, useMutation } from '@apollo/client';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useSignMessage } from 'wagmi';

import { AUTHENTICATION, GET_CHALLENGE } from '../../../graphQL/auth/auth-mutations';
import { GET_PROFILES } from '../../../graphQL/queries/get-profiles';
import { useAppStore } from '../../../store/app';
import { setLocalStorage } from '../../../utils/helpers';
import Modal from '../../UI/Modal';

function Login() {
  const setProfiles = useAppStore((state) => state.setProfiles);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);

  const [getChallenge, { error: challengeError, loading: challengeLoading }] = useLazyQuery(GET_CHALLENGE);
  const [authenticate, { error: authenticateError, loading: authenticateLoading }] =
    useMutation(AUTHENTICATION);
  const [getProfile, { error: profileError, loading: profileLoading }] = useLazyQuery(GET_PROFILES);

  const { connector, isConnected, address } = useAccount();
  const { signMessageAsync, isLoading: signLoading } = useSignMessage({
    onError: (error) => {
      console.log('error signing message', error); // TODO: convert it to toast message
    }
  });

  async function handleLogin() {
    try {
      const challenge = await getChallenge({
        variables: { request: { address } }
      });

      if (!challenge?.data?.challenge?.text) {
        throw new Error('No challenge found'); // TODO: convert it to toast message
      }

      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text
      });

      const auth = await authenticate({
        variables: { request: { address, signature } }
      });
      setLocalStorage(
        ['accessToken', 'refreshToken'],
        [auth.data?.authenticate.accessToken, auth.data?.authenticate.refreshToken]
      );
      const { data: profileData } = await getProfile({
        variables: { request: { ownedBy: address } }
      });

      if (profileData.profiles?.items) {
        const profiles = profileData?.profiles.items;
        const currentProfile = profiles[0];
        setProfiles(profiles);
        setCurrentProfile(currentProfile);
      }
    } catch (error) {
      console.log(error); // TODO: convert it to toast message
    }
  }

  const isLoading = challengeLoading || authenticateLoading || profileLoading || signLoading;
  return connector?.id ? (
    <>
      <Modal isOpen={isConnected} isClose={() => false} title={'Login to RTU Connect'}>
        <button onClick={() => handleLogin()}>{'login'}</button>
      </Modal>
      {(challengeError || authenticateError || profileError) && (
        <div className={'flex items-center space-x-1 font-bold text-red-500'}>
          <div>{'error'}</div>
        </div>
      )}
    </>
  ) : (
    <div className={'p-5'}>
      <ConnectKitButton />
    </div>
  );
}

export default Login;
