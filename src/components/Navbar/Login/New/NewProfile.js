import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';

import { CREATE_PROFILE } from '../../../../graphQL/mutations/create-profile';
import { RTU_CONNECT_PROFILE, ZERO_ADDRESS } from '../../../../utils/constants';
import { formatUsername, getStampFyiUrl, uploadFile } from '../../../../utils/helpers';
import Button from '../../../UI/Button';
import Spinner from '../../../UI/Spinner';
import PendingProfile from './PendingProfile';

function NewProfile({ isModal = false }) {
  const { address } = useAccount();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [createProfile, { data, loading }] = useMutation(CREATE_PROFILE);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const formik = useFormik({
    initialValues: {
      handle: ''
    },
    onSubmit: async (values) => {
      const metadata = {
        contentType: file?.type
      };
      const handle = formatUsername(values.handle);
      const fileUrl = file ? await uploadFile(file, `${RTU_CONNECT_PROFILE}/${nanoid(11)}`, metadata) : null;
      await createProfile({
        variables: {
          request: {
            handle,
            profilePictureUri: fileUrl ? fileUrl : getStampFyiUrl(address ?? ZERO_ADDRESS)
          }
        }
      });
    }
  });

  return data?.createProfile.__typename === 'RelayerResult' && data?.createProfile.txHash ? (
    <PendingProfile txHash={data?.createProfile?.txHash} />
  ) : (
    <form onSubmit={formik.handleSubmit}>
      {data?.createProfile.__typename === 'RelayError' &&
        data?.createProfile.reason &&
        toast.error(data?.createProfile.reason)}
      <div className={'flex flex-col px-12 pb-12'}>
        <div className={'flex flex-col items-center justify-center'}>
          {previewUrl ? (
            <div className={'relative'}>
              <img
                className={'w-32 h-32 rounded-full cursor-pointer'}
                src={previewUrl}
                alt={'Image Preview'}
              />
              <div className={'absolute inset-0 flex items-center justify-center'}>
                <button
                  className={
                    'flex items-center justify-center w-20 opacity-0 font-bold text-red-500 hover:opacity-100 rounded bg-red-100'
                  }
                  onClick={() => setPreviewUrl(null)}
                >
                  {'remove'}
                </button>
              </div>
            </div>
          ) : (
            <label
              className={
                'flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 rounded-full cursor-pointer' +
                ' hover:bg-gray-100 hover:border-gray-400 bg-gray-50'
              }
            >
              <input type={'file'} accept={'image/*'} className={'hidden'} onChange={handleFileChange} />
              {'Upload Avatar'}
            </label>
          )}
        </div>
        <input
          id={'handle'}
          name={'handle'}
          type={'text'}
          placeholder={'@Handle'}
          autoComplete={'off'}
          onChange={formik.handleChange}
          value={formik.values.handle}
          className={
            'px-4 py-2 my-4 border border-gray-200' +
            ' rounded-md shadow-sm focus:outline-none' +
            ' focus:ring-blue-500 focus:border-blue-500 focus:border-2 sm:text-sm'
          }
        />
        <Button type={'submit'} loading={loading}>
          {loading ? (
            <div className={'flex flex-col items-center justify-center'}>
              <Spinner />
            </div>
          ) : (
            'Create Profile'
          )}
        </Button>
      </div>
    </form>
  );
}

export default NewProfile;
