import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { GET_TRANSACTION_INDEX } from '../../../../graphQL/queries/get-transaction-index';
import Button from '../../../UI/Button';
import Spinner from '../../../UI/Spinner';

function PendingProfile({ handle, txHash }) {
  const { push } = useRouter();

  const { loading } = useQuery(GET_TRANSACTION_INDEX, {
    variables: {
      hasTxHashBeenIndexedRequest: {
        txHash
      }
    },
    pollInterval: 5
  });

  return (
    <div className={'p-5 font-bold text-center'}>
      {loading ? (
        <div className={'flex flex-col items-center justify-center'}>
          <Spinner />
          <span className={'my-3'}>{'Account creation in progress, please wait!'}</span>
        </div>
      ) : (
        <div className={'space-y-3'}>
          <div className={'text-[40px]'}>{'🌿'}</div>
          <div>{'Account created successfully'}</div>
          <div className={'pt-3'}>
            <Button onClick={() => push(`/`)}>{'go to homepage'}</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingProfile;
