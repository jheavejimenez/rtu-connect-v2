import { useFormik } from 'formik';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import Button from '../../../UI/Button';

function NewProfile({ isModal = false }) {
  const [avatar, setAvatar] = useState('');
  const [uploading, setUploading] = useState(false);
  const { address } = useAccount();

  const formik = useFormik({
    initialValues: {
      handle: ''
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={'flex flex-col p-12'}>
        <div className={'flex flex-col items-center justify-center'}>
          <label
            className={
              'flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 rounded-full cursor-pointer'
            }
          >
            {'Avatar'}
          </label>
        </div>
        <input
          id={'handle'}
          name={'handle'}
          type={'text'}
          placeholder={'@Jheave'}
          onChange={formik.handleChange}
          value={formik.values.handle}
          className={
            'px-4 py-2 my-4 border border-gray-300' +
            ' rounded-md shadow-sm focus:outline-none' +
            ' focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          }
        />
        <Button type={'submit'}>{'Create'}</Button>
      </div>
    </form>
  );
}

export default NewProfile;
