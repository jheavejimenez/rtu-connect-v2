import { ExternalLinkIcon } from '@rainbow-me/rainbowkit/dist/components/Icons/ExternalLink';

import { IPFS_GATEWAY } from '../../utils/constants';
import Card from '../UI/Card';

const Meta = ({ name, uri, hash }) => (
  <div className={'px-5 py-3'}>
    <a href={uri} className={'space-y-1'} target={'_blank'} rel={'noreferrer noopener'}>
      <div className={'flex items-center space-x-1'}>
        <div className={'text-[10px]'}>{name}</div>
        <ExternalLinkIcon className={'h-4 w-4'} />
      </div>
      <div className={'truncate text-xs'}>{hash}</div>
    </a>
  </div>
);

function BlockchainTransaction({ publication }) {
  const hash =
    publication?.__typename === 'Mirror'
      ? publication.mirrorOf.onChainContentURI?.split('/').pop()
      : publication.onChainContentURI?.split('/').pop();
  const isArweaveHash = hash?.length === 43;
  const isIPFSHash = hash?.length === 46 || hash?.length === 59;

  if (!isArweaveHash && !isIPFSHash) {
    return null;
  }

  return (
    <Card as={'aside'}>
      <div className={'lt-text-gray-500 divide-y'}>
        {isArweaveHash ? (
          <Meta name={`ARWEAVE TRANSACTION`} uri={`https://arweave.app/tx/${hash}`} hash={hash} />
        ) : null}
        {isIPFSHash ? <Meta name={'IPFS TRANSACTION'} uri={`${IPFS_GATEWAY}${hash}`} hash={hash} /> : null}
      </div>
    </Card>
  );
}

export default BlockchainTransaction;
