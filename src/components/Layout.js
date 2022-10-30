import Head from 'next/head';
import { useAccount, useDisconnect, useNetwork, useQuery } from 'wagmi';

import { GET_PROFILES } from '../graphQL/queries/get-profiles';
import { useAppPersistStore, useAppStore } from '../store/app';
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
  return (
    <>
      <Head>
        <title>{'RTUConnect'}</title>
        <meta name={'description'} content={'RTUConnect'} />
      </Head>
      <div className={'flex flex-col min-h-screen'}>
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
