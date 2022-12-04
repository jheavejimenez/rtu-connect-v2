import { useLazyQuery, useMutation } from '@apollo/client';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import toast from 'react-hot-toast';
import { useAccount, useSignMessage } from 'wagmi';

import { AUTHENTICATION, GET_CHALLENGE } from '../../../graphQL/auth/auth-mutations';
import { GET_PROFILES } from '../../../graphQL/queries/get-profiles';
import { useAppStore } from '../../../store/app';
import { setLocalStorage } from '../../../utils/helpers';

function Login() {
  const setProfiles = useAppStore((state) => state.setProfiles);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);

  const [getChallenge, { error: challengeError, loading: challengeLoading }] = useLazyQuery(GET_CHALLENGE);
  const [authenticate, { error: authenticateError, loading: authenticateLoading }] =
    useMutation(AUTHENTICATION);
  const [getProfile, { error: profileError, loading: profileLoading }] = useLazyQuery(GET_PROFILES);

  const { openConnectModal } = useConnectModal();

  const { address } = useAccount();
  const { signMessageAsync, isLoading: signLoading } = useSignMessage({
    onError: () => {
      toast.error('You Rejected the Signature Request');
    }
  });
  const hasProfile = useAppStore((state) => state.currentProfile);

  async function handleLogin() {
    try {
      const challenge = await getChallenge({
        variables: { request: { address } }
      });

      if (!challenge?.data?.challenge?.text) {
        toast.error('Error getting challenge');
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
      console.log(error);
    }
  }

  function lensLogin() {
    if (challengeLoading || authenticateLoading || profileLoading || signLoading) {
      return <div>{'Loading...'}</div>;
    }
    return <button onClick={handleLogin}>{'Login'}</button>;
  }

  console.log(hasProfile);
  return (
    <>
      {openConnectModal ? (
        <button
          className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
          onClick={openConnectModal}
        >
          {'Connect Wallet'}
        </button>
      ) : hasProfile ? (
        <button>{'Avatar'}</button>
      ) : (
        lensLogin()
      )}

      {(challengeError || authenticateError || profileError) &&
        toast.error('Error logging in. Please refresh the browser and try again')}
    </>
  );
}

export default Login;
