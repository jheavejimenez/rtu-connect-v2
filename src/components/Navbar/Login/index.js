import { useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import toast from 'react-hot-toast';
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

  const [showModal, setShowModal] = useState(false);
  const { connector, address } = useAccount();
  const { signMessageAsync, isLoading: signLoading } = useSignMessage({
    onError: () => {
      toast.error('You Rejected the Signature Request');
    }
  });

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

  const isLoading = challengeLoading || authenticateLoading || profileLoading || signLoading;
  return (
    <>
      {connector?.id ? (
        <Modal
          title={'Login to RTU Connect'}
          isOpen={showModal}
          isClose={() => {
            setShowModal(false);
          }}
        >
          <button onClick={() => handleLogin()}>{'login'}</button>
        </Modal>
      ) : null}
      {/*<ConnectKitButton />*/}
      {(challengeError || authenticateError || profileError) &&
        toast.error('Error logging in. Please refresh the browser and try again')}
    </>
  );
}

export default Login;
