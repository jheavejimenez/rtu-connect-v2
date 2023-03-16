import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppStore } from '../../../store/app';
import { APP_NAME } from '../../../utils/constants';
import { fixUsername, getAvatarUrl } from '../../../utils/helpers';
import rtuLogo from '../../logos/rtuLogo.png';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Modal from '../../UI/Modal';
import Editor from '../index';

function NewPublication() {
  const profile = useAppStore((state) => state.currentProfile);
  const error = false;
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <Modal
        title={APP_NAME}
        icon={<Image height={30} width={30} src={rtuLogo} alt={'RTU Logo'} />}
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        {error && toast.error('Transaction Failed')}
        <Editor />
        {error && (
          <div className={'px-5 pb-3 mt-1 text-sm font-bold text-red-500'}>{'Publication Error'}</div>
        )}
        <div className={'block items-center sm:flex px-5'}>
          <div className={'ml-auto pt-2 sm:pt-0'}>
            <Button>{'Post'}</Button>
          </div>
        </div>
        <div className={'py-5'} />
      </Modal>
      <Card className={'p-5 space-y-3 !rounded-xl'}>
        <div className={'flex items-center space-x-3'}>
          <Link href={`/user/${profile?.handle}`}>
            <img
              src={getAvatarUrl(profile)}
              loading={'lazy'}
              className={'w-12 h-12 bg-gray-200 rounded-full border'}
              height={40}
              width={40}
              alt={fixUsername(profile?.handle)}
            />
          </Link>
          <button
            className={
              'w-full flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200'
            }
            onClick={() => setShowLoginModal(!showLoginModal)}
          >
            <span className={'text-gray-400'}>
              {`What's on your mind?, ${profile?.handle.replace('.test', '')}`}
            </span>
          </button>
        </div>
      </Card>
    </>
  );
}

export default NewPublication;
