import Head from 'next/head';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import useIsMounted from '../utils/hooks/useIsMounted';

function Layout({ children }) {
  const { mounted } = useIsMounted();

  // user wallet
  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const clearAuthState = () => {
    setProfileId(null);
    setCurrentProfile(null);
  };

  return (
    <>
      <Head>
        <title>RTUConnect</title>
        <meta name="description" content="RTUConnect" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        {/*insert navbar component here*/}
        {children}
      </div>
    </>
  );
}

export default Layout;
