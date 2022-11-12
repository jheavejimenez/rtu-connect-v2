import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import { GET_PROFILES } from '../graphQL/queries/get-profiles';
import { useAppPersistStore, useAppStore } from '../store/app';
import { CHAIN_ID } from '../utils/constants';
import { getTokenFromLocalStorage } from '../utils/helpers';
import useIsMounted from '../utils/hooks/useIsMounted';
import Navbar from './Navbar';

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
      const selectedUser = profiles?.find((p) => p.id === profileId);
      setProfiles(profiles);
      setCurrentProfile(selectedUser);
      setUserSigNonce(data?.profiles.items[0]?.nonce);
    }
  });

  const validateLogin = () => {
    const currentProfileAddress = currentProfile?.ownedBy;
    const isSwitchedAccount = currentProfileAddress !== undefined && currentProfileAddress !== address;
    const isWrongNetwork = chain?.id !== CHAIN_ID;
    const isDisconnectedWallet =
      !getTokenFromLocalStorage() || isDisconnected || isWrongNetwork || isSwitchedAccount;

    if (isDisconnectedWallet) {
      disconnect();
    }
  };

  useEffect(() => {
    validateLogin();
  }, [isDisconnected, address, chain, disconnect, profileId]);

  if (loading || !mounted) {
    return <div className={'grid h-screen place-items-center animate-pulse'}>{'Loading...'}</div>;
  }

  return (
    <>
      <Head>
        <title>{'RTUConnect'}</title>
        <meta name={'description'} content={'RTUConnect'} />
      </Head>
      <Toaster
        position={'top-right'}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          }
        }}
      />
      <div className={'flex flex-col min-h-screen'}>
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
