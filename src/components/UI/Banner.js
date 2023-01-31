import { CurrencyDollarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import { FAUCET } from '../../utils/constants';

function Banner({ title, text }) {
  return (
    <aside
      className={
        'rounded-none sm:rounded-xl border mb-4 bg-yellow-100 border border-yellow-400 ' +
        'space-y-2.5 text-yellow-600 p-5'
      }
    >
      <div className={'flex items-center space-x-2 font-bold text-yellow-700'}>
        <ExclamationTriangleIcon className={'h-6 w-6 text-yellow-700'} aria-hidden={'true'} />
        <p>{title}</p>
      </div>
      <p className={'text-sm leading-[22px]'}>{text}</p>
      <div className={'flex items-center space-x-1.5 text-sm font-bold text-yellow-700'}>
        <CurrencyDollarIcon className={'h-6 w-6 text-yellow-700'} />
        <a href={FAUCET} target={'_blank'} rel={'noreferrer noopener'}>
          {'Get Testnet Token'}
        </a>
      </div>
    </aside>
  );
}

export default Banner;
