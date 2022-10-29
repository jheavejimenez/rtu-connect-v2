import Head from 'next/head';

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
  // const { address, isDisconnected } = useAccount();
  // const { chain } = useNetwork();
  // const { disconnect } = useDisconnect();

  const clearAuthState = () => {
    setProfileId(null);
    setCurrentProfile(null);
  };

  return (
    <>
      <Head>
        <title>{'RTUConnect'}</title>
        <meta name={'description'} content={'RTUConnect'} />
        <link rel={'icon'} href={'/public/favicon.ico'} />
      </Head>
      <div className={'flex flex-col min-h-screen'}>
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
