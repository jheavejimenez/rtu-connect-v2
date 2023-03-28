import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import { GET_PROFILES } from '../graphQL/queries/get-profiles';
import { useAppPersistStore, useAppStore } from '../store/app';
import { APP_NAME, CHAIN_ID, LS_KEYS } from '../utils/constants';
import { clearLocalStorage, getTokenFromLocalStorage } from '../utils/helpers';
import useIsMounted from '../utils/hooks/useIsMounted';
import Navbar from './Navbar';
import Loading from './Shimmer/Loading';
import MetaTags from './UI/MetaTags';

function Layout({ children }) {
  const setProfiles = useAppStore((state) => state.setProfiles);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  const profileId = useAppPersistStore((state) => state.profileId);
  const setProfileId = useAppPersistStore((state) => state.setProfileId);

  const { mounted } = useIsMounted();
  // user wallet
  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const clearAuthState = () => {
    setProfileId(null);
    setCurrentProfile(null);
  };

  const { loading } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: address }
    },
    onCompleted: (data) => {
      const profiles = data?.profiles.items;

      if (!profiles?.length) {
        clearAuthState();
      }
      const selectedUser = profiles.find((profile) => profile.id === profileId);
      setProfiles(profiles);
      setProfileId(selectedUser?.id);
      setCurrentProfile(selectedUser);
      setUserSigNonce(data?.profiles.items[0]?.nonce);
    },
    onError: () => {
      setProfileId(null);
    }
  });

  const validateLogin = () => {
    const currentProfileAddress = currentProfile?.ownedBy;
    const isSwitchedAccount = currentProfileAddress !== undefined && currentProfileAddress !== address;
    const isWrongNetwork = chain?.id !== CHAIN_ID;
    const isDisconnectedWallet =
      !getTokenFromLocalStorage() || isDisconnected || isWrongNetwork || isSwitchedAccount;

    if (isDisconnectedWallet) {
      clearAuthState();
      clearLocalStorage(['accessToken', 'refreshToken', LS_KEYS.RTU_CONNECT_STORE]);
      disconnect?.();
    }
  };

  useEffect(() => {
    validateLogin();
  }, [isDisconnected, address, chain, disconnect, profileId]);

  if (loading || !mounted) {
    return <Loading />;
  }

  return (
    <>
      <MetaTags
        tile={APP_NAME}
        description={
          'A decentralize social media for Rizal Technological University built with Lens Protocol 🌿'
        }
      />
      <Toaster
        position={'bottom-right'}
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 5000
          },
          error: {
            duration: 6000
          }
        }}
      />
      <div className={'flex flex-col min-h-screen bg-gray-50'}>
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
