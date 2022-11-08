import { useState } from 'react';

import { APP_NAME } from '../../../utils/constants';

function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasProfile, setHasProfile] = useState(true);

  return (
    <div className={'p-5'}>
      {hasProfile ? (
        <div className={'space-y-5'}>
          {isConnected ? (
            <div className={'space-y-1'}>
              <div className={'text-xl font-bold'}>{`Welcome To ${APP_NAME}`}</div>
            </div>
          ) : (
            <div className={'space-y-1'}>
              <div className={'text-sm text-gray-500'}>
                {'Connect with one of our available wallet providers or create a new one.'}
              </div>
            </div>
          )}
          {/* put the wallet options here */}
        </div>
      ) : // <NewProfile isModal />
      null}
    </div>
  );
}

export default Login;
