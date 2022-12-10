import { useState } from 'react';
import { useAccount } from 'wagmi';

function NewProfile({ isModal = false }) {
  const [avatar, setAvatar] = useState('');
  const [uploading, setUploading] = useState(false);
  const { address } = useAccount();

  return (
    <form className={'space-y-4'}>
      {isModal && (
        <div className={'mb-2 space-y-4'}>
          <img className={'w-10 h-10'} height={40} width={40} alt={'Logo'} />
          <div className={'text-xl font-bold'}>{'Signup to'}</div>
        </div>
      )}
      <input label={'Handle'} type={'text'} placeholder={'gavin'} />
      <div className={'space-y-1.5'}>
        <div className={'label'}>{'Avatar'}</div>
        <div className={'space-y-3'}>
          {avatar && (
            <div>
              <img className={'w-60 h-60 rounded-lg'} height={240} width={240} src={avatar} alt={avatar} />
            </div>
          )}
          <div>
            <div className={'flex items-center space-x-3'}>
              <input />
            </div>
          </div>
        </div>
      </div>
      <button className={'ml-auto'} type={'submit'}>
        {'Signup'}
      </button>
    </form>
  );
}

export default NewProfile;
