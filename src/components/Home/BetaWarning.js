import { CurrencyDollarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import { APP_NAME, FAUCET } from '../../utils/constants';

function BetaWarning() {
  return (
    <aside
      className={
        'rounded-none sm:rounded-xl border mb-4 bg-yellow-100 border border-yellow-400 ' +
        'space-y-2.5 text-yellow-600 p-5'
      }
    >
      <div className={'flex items-center space-x-2 font-bold text-yellow-700'}>
        <ExclamationTriangleIcon className={'h-6 w-6 text-yellow-700'} aria-hidden={'true'} />
        <p>{'Beta warning!'}</p>
      </div>
      <p className={'text-sm leading-[22px]'}>
        {`${APP_NAME} is in beta. It is not yet ready for production use. It may contain bugs.`}
      </p>
      <div className={'flex items-center space-x-1.5 text-sm font-bold text-yellow-700'}>
        <CurrencyDollarIcon className={'h-6 w-6 text-yellow-700'} />
        <a href={FAUCET} target={'_blank'} rel={'noreferrer noopener'}>
          {'Get Testnet Token'}
        </a>
      </div>
      {/*<p className={'text-sm leading-[22px]'}>*/}
      {/*  {`Visit our Documentation to `}*/}
      {/*  <span className={'text-sm font-bold text-yellow-700'}>*/}
      {/*    <a href={GITBOOK} target={'_blank'} rel={'noreferrer noopener'}>*/}
      {/*      {'learn more'}*/}
      {/*    </a>*/}
      {/*  </span>*/}
      {/*</p>*/}
    </aside>
  );
}

export default BetaWarning;
