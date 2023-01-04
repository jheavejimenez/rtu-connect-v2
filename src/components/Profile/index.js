import { CheckCircleIcon } from '@heroicons/react/24/outline';

function UserProfile({ profile }) {
  return (
    <div className={'flex justify-between items-center'}>
      <div className={'flex items-center space-x-3'}>
        <img
          src={
            'https://media.lenster.xyz/tr:n-avatar,tr:di-placeholder.webp/https://statics-mumbai-lens-staging.s3.eu-west-1.amazonaws.com/profile/QmVeEwimhwaebeHFDTVY3XNjFuaNUWuhv1ksNefnzeTKXH'
          }
          loading={'lazy'}
          className={('w-10 h-10', 'bg-gray-200 rounded-full border')}
          height={40}
          width={40}
          alt={profile?.handle}
        />
        <div>
          <div className={'flex gap-1 items-center max-w-sm truncate'}>
            <div className={'text-md'}>{profile?.name ?? profile?.handle}</div>
            <CheckCircleIcon className={'w-4 h-4 text-blue-700'} />
          </div>
          <p className={'text-sm'}>
            {profile?.handle}
            {'@'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
