import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import { storage } from '../../../../utils/firebase';
import Button from '../../../UI/Button';

function NewProfile({ isModal = false }) {
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { address } = useAccount();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const uploadFile = () => {
    if (avatar == null) {
      return;
    }
    const imageRef = ref(storage, `profile/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

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
        <Button type={'submit'} onClick={uploadFile}>
          {'Create'}
        </Button>
      </div>
    </form>
  );
}

export default NewProfile;
