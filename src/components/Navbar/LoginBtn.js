import { useState } from 'react';

import Modal from '../UI/Modal';
import Login from './Login';

function LoginBtn() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal title={'Connect your wallet.'} isOpen={showModal} isClose={() => setShowModal(false)}>
        <Login />
      </Modal>
      <button
        className={
          'inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white' +
          ' bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        }
        onClick={() => setShowModal(!showModal)}
      >
        {'Login'}
      </button>
    </>
  );
}

export default LoginBtn;
