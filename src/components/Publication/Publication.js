import moment from 'moment/moment';
import React from 'react';

import UserProfile from '../Profile';
import Reactions from '../Reacts';
import PublicationBody from './PublicationBody';
import PublicationType from './Type';

// Helper function to get the stats for a publication
// const getStats = (publication) => {
//   const isMirror = publication.__typename === 'Mirror';
//   const stats = isMirror ? publication.mirrorOf.stats : publication.stats;
//   return {
//     mirrorCount: stats.totalAmountOfMirrors,
//     reactionCount: stats.totalUpvotes,
//     collectCount: stats.totalAmountOfCollects
//   };
// };
//
// // Helper function to get the profile for a publication
// const getProfile = (publication) => {
//   const isMirror = publication.__typename === 'Mirror';
//   return isMirror ? publication.mirrorOf.profile : publication.profile;
// };
//
// // Helper function to get the timestamp for a publication
// const getTimestamp = (publication) => {
//   const isMirror = publication.__typename === 'Mirror';
//   return isMirror ? publication.mirrorOf.createdAt : publication.createdAt;
// };

function Publication({ publication }) {
  const isMirror = publication.__typename === 'Mirror';
  const profile = isMirror ? publication?.mirrorOf?.profile : publication?.profile;
  const timestamp = isMirror ? publication?.mirrorOf?.createdAt : publication?.createdAt;

  const mirrorCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
    : publication?.stats?.totalAmountOfMirrors;
  const reactionCount = isMirror
    ? publication?.mirrorOf?.stats?.totalUpvotes
    : publication?.stats?.totalUpvotes;
  const collectCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfCollects
    : publication?.stats?.totalAmountOfCollects;
  const showStats = mirrorCount > 0 || reactionCount > 0 || collectCount > 0;

  return (
    <article className={'p-5'}>
      <PublicationType publication={publication} />
      <div>
        <div className={'flex justify-between pb-4 space-x-1.5'}>
          <UserProfile profile={profile ?? publication?.collectedBy?.defaultProfile} />
        </div>
        <div className={'ml-[53px]'}>
          <PublicationBody publication={publication} />
          <div className={'text-sm text-gray-500 my-3'}>
            <span>{moment(timestamp).fromNow()}</span>
          </div>
          <div className={'divider'} />
          <Reactions />
        </div>
      </div>
    </article>
  );
}

export default Publication;
