import Head from 'next/head';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

function Layout({ children }) {
  // user wallet
  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  return (
    <>
      <Head>
        <title>RTUConnect</title>
        <meta name="description" content="RTUConnect" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">{children}</div>
    </>
  );
}

export default Layout;
