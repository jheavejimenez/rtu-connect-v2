import { EyeIcon } from '@heroicons/react/20/solid';
import { Interweave } from 'interweave';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { contentFormatter } from '../../utils/helpers';

function PublicationBody({ publication }) {
  const { pathname } = useRouter();
  const showMore = publication?.metadata?.content?.length > 450 && pathname !== '/posts/[id]';
  const content = showMore
    ? contentFormatter(publication?.metadata?.content?.slice(0, 450))
    : contentFormatter(publication?.metadata?.content);

  return (
    <div className={'break-words'}>
      <Interweave
        className={'whitespace-pre-wrap break-words text-md'}
        allowList={['b', 'i', 'a', 'br', 'code', 'span']}
        content={content}
      />
      {showMore && (
        <div className={'mt-4 text-sm text-gray-500 font-bold flex items-center space-x-1'}>
          <EyeIcon className={'h-4 w-4'} />
          <Link href={`/posts/${publication?.id}`}>{'Show more'}</Link>
        </div>
      )}
    </div>
  );
}

export default PublicationBody;
