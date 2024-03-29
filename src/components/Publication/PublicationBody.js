import { EyeIcon } from '@heroicons/react/20/solid';
import { Interweave } from 'interweave';
import { MentionMatcher } from 'interweave-autolink';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { contentFormatter, MDCodeMatcher, UrlMatcher } from '../../utils/helpers';
import MediaRenderer from './MediaRenderer';

function PublicationBody({ publication }) {
  const { pathname } = useRouter();
  const showMore = publication?.metadata?.content?.length > 450 && pathname !== '/posts/[id]';
  const content = showMore
    ? contentFormatter(publication?.metadata?.content?.slice(0, 450))
    : contentFormatter(publication?.metadata?.content);

  const matchers = [new UrlMatcher('url'), new MDCodeMatcher('code'), new MentionMatcher('mention')];

  return (
    <div className={'break-words'}>
      <Interweave
        className={'whitespace-pre-wrap break-words text-md'}
        allowList={['b', 'i', 'a', 'br', 'code', 'span']}
        content={content}
        matchers={matchers}
        onClick={(event) => event.stopPropagation()}
      />
      {showMore && (
        <div className={'mt-4 text-sm text-gray-500 font-bold flex items-center space-x-1'}>
          <EyeIcon className={'h-4 w-4'} />
          <Link href={`/posts/${publication?.id}`}>{'Show more'}</Link>
        </div>
      )}
      {publication?.metadata?.media?.length > 0 && (
        <MediaRenderer
          media={publication?.metadata?.media[0]?.original?.url}
          mediaType={publication?.metadata?.media[0]?.original?.mimeType}
        />
      )}
    </div>
  );
}

export default PublicationBody;
