import { ApolloProvider } from '@apollo/client';
import { ConnectKitProvider } from 'connectkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
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
    new MetaMaskConnector({
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
      <ConnectKitProvider theme={'default'} mode={'light'}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default Providers;
