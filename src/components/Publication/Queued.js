import { useApolloClient } from '@apollo/client';
import { Interweave } from 'interweave';
import toast from 'react-hot-toast';

import {
  PublicationDocument,
  useHasTxHashBeenIndexedQuery,
  usePublicationLazyQuery
} from '../../../generated';
import { useAppPersistStore, useAppStore } from '../../store/app';
import UserProfile from '../Profile';
import MediaRenderer from './MediaRenderer';

function Queued({ txn }) {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useAppPersistStore((state) => state.txnQueue);
  const setTxnQueue = useAppPersistStore((state) => state.setTxnQueue);

  const { cache } = useApolloClient();
  const txHash = txn?.txHash;

  const removeTxn = () => {
    if (txHash) {
      setTxnQueue(txnQueue.filter((o) => o.txHash !== txHash));
    }
  };

  const [getPublication] = usePublicationLazyQuery({
    onCompleted: (data) => {
      if (data?.publication) {
        cache.modify({
          fields: {
            publications() {
              cache.writeQuery({ data: data?.publication, query: PublicationDocument });
            }
          }
        });
      }
    }
  });

  useHasTxHashBeenIndexedQuery({
    variables: { request: { txHash } },
    pollInterval: 1000,
    onCompleted: async (data) => {
      if (data.hasTxHashBeenIndexed.__typename === 'TransactionError') {
        toast.error('transaction error');
        return removeTxn();
      }

      if (data.hasTxHashBeenIndexed.__typename === 'TransactionIndexedResult') {
        const status = data.hasTxHashBeenIndexed.metadataStatus?.status;

        if (status === 'METADATA_VALIDATION_FAILED' || status === 'NOT_FOUND') {
          toast.error('metadata validation failed');
          return removeTxn();
        }
        if (data.hasTxHashBeenIndexed.indexed) {
          await getPublication({
            variables: {
              request: { txHash: data.hasTxHashBeenIndexed.txHash },
              reactionRequest: currentProfile ? { profileId: currentProfile?.id } : null,
              profileId: currentProfile?.id ?? null
            }
          });
          removeTxn();
          toast.success('Transaction has been indexed');
        }
      }
    }
  });

  return (
    <article
      className={'hover:bg-gray-100 animate-pulse rounded-none sm:rounded-xl border bg-white mb-3.5 p-5'}
    >
      <div className={'flex items-start justify-between pb-4'}>
        <UserProfile profile={currentProfile} />
        <span className={'text-xs text-gray-500'}>{'transaction queuing'}</span>
      </div>
      <div className={'ml-[53px] break-words'}>
        <div className={'leading-md linkify text-md break-words'}>
          <Interweave
            className={'whitespace-pre-wrap break-words text-md'}
            allowList={['b', 'i', 'a', 'br', 'code', 'span']}
            content={txn?.content}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
        {txn?.attachments.length > 0 && (
          <MediaRenderer media={txn?.attachments[0]?.item} mediaType={txn?.attachments[0]?.type} />
        )}
      </div>
    </article>
  );
}

export default Queued;
