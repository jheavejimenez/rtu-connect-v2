import { ConnectKitButton } from 'connectkit';

function CustomConnectKitButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return <button onClick={show}>{isConnected ? address : 'Connect Wallet'}</button>;
      }}
    </ConnectKitButton.Custom>
  );
}

export default CustomConnectKitButton;
