import { ConnectKitButton } from 'connectkit';

function CustomConnectKitButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button onClick={show} className={'bg-blue-500 text-white font-semibold rounded-full px-4 py-2'}>
            {isConnected ? ensName ?? truncatedAddress : 'Login'}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

export default CustomConnectKitButton;
