import { ApolloProvider } from '@apollo/client';
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
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </WagmiConfig>
  );
}

export default Providers;
