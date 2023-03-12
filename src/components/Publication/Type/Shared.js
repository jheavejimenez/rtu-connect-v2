import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { fixUsername } from '../../../utils/helpers';

function Shared({ publication }) {
  const typeName = publication?.mirrorOf?.__typename?.toLowerCase() || '';
  const profile = publication?.profile;

  return (
    <div className={'flex items-center pb-4 space-x-1 text-gray-900 text-sm'}>
      <ArrowPathRoundedSquareIcon className={'w-[15px] sm:w-[18px] text-blue-500'} />
      <span className={'max-w-xs truncate'}>
        {fixUsername(profile?.name) ?? fixUsername(profile?.handle)}
      </span>
      <Link href={`/posts/${publication?.mirrorOf?.id}`} className={'font-bold'}>
        {typeName ? `shared a ${typeName}` : 'shared'}
      </Link>
    </div>
  );
}

export default Shared;
