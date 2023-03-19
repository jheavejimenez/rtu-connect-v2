import '@rainbow-me/rainbowkit/styles.css';

import { ApolloProvider } from '@apollo/client';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import client from '../utils/apollo';
import { ALCHEMY_KEY, APP_NAME, GITBOOK } from '../utils/constants';

const { chains, provider } = configureChains([polygonMumbai], [alchemyProvider({ apiKey: ALCHEMY_KEY })]);

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
      <RainbowKitProvider
        appInfo={{
          appName: APP_NAME,
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
