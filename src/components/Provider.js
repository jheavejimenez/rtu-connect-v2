import { ApolloProvider } from '@apollo/client';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import client from '../utils/apollo';
import { ALCHEMY_KEY } from '../utils/constants';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: ALCHEMY_KEY })]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: { shimDisconnect: true }
    })
  ],
  provider
});

function Providers({ children }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </WagmiConfig>
  );
}

export default Providers;
