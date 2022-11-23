import '@rainbow-me/rainbowkit/styles.css';

import { ApolloProvider } from '@apollo/client';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import client from '../utils/apollo';
import { ALCHEMY_KEY, GITBOOK } from '../utils/constants';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: ALCHEMY_KEY })]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({
        chains,
        shimDisconnect: true
      }),
      rainbowWallet({
        chains,
        shimDisconnect: true
      }),
      walletConnectWallet({
        chains
      })
    ]
  }
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function Providers({ children }) {
  return (
    <WagmiConfig client={wagmiClient}>
      {/*<ConnectKitProvider*/}
      {/*  theme={'default'}*/}
      {/*  mode={'light'}*/}
      {/*  options={{*/}
      {/*    hideNoWalletCTA: true,*/}
      {/*    disclaimer: (*/}
      {/*      <div className={'text-base'}>*/}
      {/*        <a href={`${GITBOOK}/getting-set-up/setting-up-metamask`} target={'_blank'} rel={'noreferrer'}>*/}
      {/*          {'I don’t have a wallet'}*/}
      {/*        </a>*/}
      {/*      </div>*/}
      {/*    )*/}
      {/*  }}*/}
      {/*  customTheme={{*/}
      {/*    '--ck-connectbutton-background': 'rgb(231,231,231)',*/}
      {/*    '--ck-connectbutton-hover-background': 'rgb(211,211,211)'*/}
      {/*  }}*/}
      {/*>*/}
      {/*</ConnectKitProvider>*/}
      <RainbowKitProvider
        appInfo={{
          appName: 'RTU Connect',
          learnMoreUrl: `${GITBOOK}`
        }}
        chains={chains}
      >
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Providers;
