import { EyeIcon } from '@heroicons/react/20/solid';
import { Markup } from 'interweave';
import Link from 'next/link';
import { useRouter } from 'next/router';

function PublicationBody({ publication }) {
  const { pathname } = useRouter();
  const showMore = publication?.metadata?.content?.length > 450 && pathname !== '/posts/[id]';

  return (
    <div className={'break-words'}>
      <Markup content={publication?.metadata?.content} />
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
