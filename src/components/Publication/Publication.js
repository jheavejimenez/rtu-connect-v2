import React from 'react';

import PublicationBody from './PublicationBody';

// Helper function to get the stats for a publication
const getStats = (publication) => {
  const isMirror = publication.__typename === 'Mirror';
  const stats = isMirror ? publication.mirrorOf.stats : publication.stats;
  return {
    mirrorCount: stats.totalAmountOfMirrors,
    reactionCount: stats.totalUpvotes,
    collectCount: stats.totalAmountOfCollects
  };
};

// Helper function to get the profile for a publication
const getProfile = (publication) => {
  const isMirror = publication.__typename === 'Mirror';
  return isMirror ? publication.mirrorOf.profile : publication.profile;
};

// Helper function to get the timestamp for a publication
const getTimestamp = (publication) => {
  const isMirror = publication.__typename === 'Mirror';
  return isMirror ? publication.mirrorOf.createdAt : publication.createdAt;
};

function Publication({ publication }) {
  const { mirrorCount, reactionCount, collectCount } = getStats(publication);
  const showStats = mirrorCount > 0 || reactionCount > 0 || collectCount > 0;
  const profile = getProfile(publication);
  const timestamp = getTimestamp(publication);

  return (
    <article className={'p-5'}>
      <div>
        <div className={'flex justify-between pb-4 space-x-1.5'}>{profile}</div>
        <div className={'ml-[53px]'}>
          <PublicationBody publication={publication} />
          <div className={'text-sm text-gray-500 my-3'}>{'2 mins ago'}</div>
          {showStats && <div className={'divider'} />}
        </div>
      </div>
    </article>
  );
}

export default Publication;
