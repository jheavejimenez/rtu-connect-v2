import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useSignMessage } from 'wagmi';

import { useAuthenticateMutation, useChallengeLazyQuery, useUserProfilesLazyQuery } from '../../../generated';
import { useAppPersistStore, useAppStore } from '../../store/app';
import { useAuthStore } from '../../store/auth';
import { setLocalStorage } from '../helpers';

function useLogin() {
  const { openConnectModal } = useConnectModal();

  const setProfiles = useAppStore((state) => state.setProfiles);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);
  const setLoginRequested = useAuthStore((state) => state.setLoginRequested);
  const setSigningInProgress = useAuthStore((state) => state.setSigningInProgress);
  const setShowSignupModal = useAuthStore((state) => state.setShowSignupModal);

  const [getChallenge] = useChallengeLazyQuery({
    fetchPolicy: 'no-cache'
  });

  const [authenticate] = useAuthenticateMutation();
  const [getProfile] = useUserProfilesLazyQuery();

  const { address, connector, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage({
    onError: () => {
      toast.error('You Rejected the Signature Request');
    }
  });

  const handleLogin = useCallback(async () => {
    try {
      setSigningInProgress(true);

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
        variables: { ownedBy: address }
      });

      if (
        !profileData ||
        !profileData.profiles ||
        !profileData.profiles.items ||
        profileData.profiles.items.length === 0
      ) {
        setShowSignupModal(true);
      } else {
        const profiles = profileData.profiles.items;
        const currentProfile = profiles[0];
        setProfiles(profiles);
        setCurrentProfile(currentProfile);
        setProfileId(currentProfile.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSigningInProgress(false);
    }
  }, [
    address,
    authenticate,
    getProfile,
    getChallenge,
    setCurrentProfile,
    setProfileId,
    setProfiles,
    setShowSignupModal,
    setSigningInProgress,
    signMessageAsync
  ]);

  const showLoginFlow = useCallback(() => {
    setLoginRequested(true);
    if (openConnectModal) {
      openConnectModal();
      return;
    }

    if (connector?.id && isConnected) {
      handleLogin();
    }
  }, [connector?.id, handleLogin, isConnected, openConnectModal, setLoginRequested]);

  return { showLoginFlow, handleLogin };
}

export default useLogin;
