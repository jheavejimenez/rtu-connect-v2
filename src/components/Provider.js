import { ApolloProvider } from '@apollo/client';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import client from '../utils/apollo';
import { ALCHEMY_KEY, ALCHEMY_RPC, CHAIN_ID } from '../utils/constants';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: ALCHEMY_KEY })]
);

const connectors = () => {
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true }
    }),
    new WalletConnectConnector({
      chains,
      options: { rpc: { [CHAIN_ID]: ALCHEMY_RPC } }
    })
  ];
};

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
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
