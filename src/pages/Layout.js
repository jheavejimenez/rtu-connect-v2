import { useAccount, useDisconnect, useNetwork } from 'wagmi';

function Layout({ children }) {
  // user wallet
  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
