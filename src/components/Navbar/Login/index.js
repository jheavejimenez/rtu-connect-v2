import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import Modal from '../../UI/Modal';

function Login() {
  const [hasProfile, setHasProfile] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <Modal
        title={'Login'}
        icon={<ArrowRightCircleIcon className={'w-5 h-5'} />}
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <div className={'text-center'}>
          <div className={'text-gray-600 text-sm mb-2'}>
            {hasProfile ? 'Login with your profile' : 'Create a new profile'}
          </div>
        </div>
      </Modal>
      <button
        className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
        onClick={() => setShowLoginModal(!showLoginModal)}
      >
        {'Login'}
      </button>
    </>
  );
}

export default Login;
