import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import { APP_NAME } from '../utils/constants';
import Navbar from './Navbar';

function Layout({ children }) {
  // const setProfiles = useAppStore((state) => state.setProfiles);
  // const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  // const currentProfile = useAppStore((state) => state.currentProfile);
  // const setCurrentProfile = useAppStore((state) => state.setCurrentProfile);
  // const profileId = useAppPersistStore((state) => state.profileId);
  // const setProfileId = useAppPersistStore((state) => state.setProfileId);
  //
  // const { mounted } = useIsMounted();
  // // user wallet
  // const { address, isDisconnected } = useAccount();
  // const { chain } = useNetwork();
  // const { disconnect } = useDisconnect();
  //
  // const clearAuthState = () => {
  //   setProfileId(null);
  //   setCurrentProfile(null);
  // };

  // const { loading } = useQuery(GET_PROFILES, {
  //   variables: {
  //     request: { ownedBy: address }
  //   },
  //   onCompleted: (data) => {
  //     const profiles = data?.profiles.items;
  //
  //     if (!profiles?.length) {
  //       clearAuthState();
  //     }
  //     const selectedUser = profiles?.find((p) => p.id === profileId);
  //     setProfiles(profiles);
  //     setCurrentProfile(selectedUser);
  //     setUserSigNonce(data?.profiles.items[0]?.nonce);
  //   }
  // });

  // const validateLogin = () => {
  //   const currentProfileAddress = currentProfile?.ownedBy;
  //   const isSwitchedAccount = currentProfileAddress !== undefined && currentProfileAddress !== address;
  //   const isWrongNetwork = chain?.id !== CHAIN_ID;
  //   const isDisconnectedWallet =
  //     !getTokenFromLocalStorage() || isDisconnected || isWrongNetwork || isSwitchedAccount;
  //
  //   if (isDisconnectedWallet) {
  //     clearAuthState();
  //     clearLocalStorage(['accessToken', 'refreshToken', 'rtuconnect.store']);
  //     disconnect();
  //   }
  // };
  //
  // useEffect(() => {
  //   validateLogin();
  // }, [isDisconnected, address, chain, disconnect, profileId]);
  //
  // if (loading || !mounted) {
  //   return <Loading />;
  // }

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name={'description'} content={APP_NAME} />
      </Head>
      <Toaster
        containerStyle={{
          position: 'relative',
          top: '65px'
        }}
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
      <div className={'flex flex-col min-h-screen bg-gray-50'}>
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
