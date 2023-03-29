import moment from 'moment';
import React from 'react';

import UserProfile from '../Profile';
import Reactions from '../Reacts';
import PublicationBody from './PublicationBody';
import PublicationType from './Type';

function Publication({ publication }) {
  const isMirror = publication.__typename === 'Mirror';
  const profile = isMirror ? publication?.mirrorOf?.profile : publication?.profile;
  const timestamp = isMirror ? publication?.mirrorOf?.createdAt : publication?.createdAt;

  return (
    <article className={'p-5'}>
      <PublicationType publication={publication} />
      <div>
        <div className={'flex justify-between pb-4 space-x-1.5'}>
          <span onClick={(event) => event.stopPropagation()}>
            <UserProfile profile={profile ?? publication?.collectedBy?.defaultProfile} />
          </span>
          <span className={'text-xs text-gray-500'}>{moment(timestamp).fromNow()}</span>
        </div>
        <div className={'ml-[53px]'}>
          <PublicationBody publication={publication} />
          <div className={'divider'} />
          <Reactions publication={publication} />
        </div>
      </div>
    </article>
  );
}

export default Publication;
