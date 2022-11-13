import { ConnectKitButton } from 'connectkit';

function CustomConnectKitButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress }) => {
        return <button onClick={show}>{isConnected ? truncatedAddress : 'Connect Wallet'}</button>;
      }}
    </ConnectKitButton.Custom>
  );
}

export default CustomConnectKitButton;
