import '@rainbow-me/rainbowkit/styles.css';

import { LensProvider, staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { APP_NAME, GITBOOK } from '../utils/constants';
// const { chains, provider } = configureChains(
//   [chain.polygonMumbai],
//   [alchemyProvider({ apiKey: ALCHEMY_KEY })]
// );

const { provider, webSocketProvider, chains } = configureChains([polygonMumbai], [publicProvider()]);

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

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider
// });
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});

const lensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  storage: localStorage()
};

function Providers({ children }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: APP_NAME,
          learnMoreUrl: `${GITBOOK}`
        }}
        chains={chains}
      >
        <LensProvider config={lensConfig}>
          {children}
          {/*<ApolloProvider client={client}>{children}</ApolloProvider>*/}
        </LensProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Providers;
