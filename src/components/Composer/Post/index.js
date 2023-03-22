import { useMutation } from '@apollo/client';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useContractWrite, useSignTypedData } from 'wagmi';

import { BROADCAST_TRANSACTION } from '../../../graphQL/mutations/broadcast-transaction';
import { CREATE_PUBLICATION } from '../../../graphQL/mutations/create-publications';
import { useAppPersistStore, useAppStore } from '../../../store/app';
import LensHubProxy from '../../../utils/abis/LensHubProxy.json';
import { APP_NAME, LENS_HUB_MUMBAI } from '../../../utils/constants';
import {
  fixUsername,
  generateTxnQueData,
  getAvatarUrl,
  getSignature,
  splitSignature,
  uploadToIPFS
} from '../../../utils/helpers';
import rtuLogo from '../../logos/rtuLogo.png';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Modal from '../../UI/Modal';
import Spinner from '../../UI/Spinner';
import Editor from '../index';

function NewPublication() {
  const publicationContent = useAppStore((state) => state.publicationContent);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const setPublicationContent = useAppStore((state) => state.setPublicationContent);
  const setTxnQueue = useAppPersistStore((state) => state.setTxnQueue);
  const txnQueue = useAppPersistStore((state) => state.txnQueue);

  // States
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { signTypedDataAsync, isLoading: typedDataLoading } = useSignTypedData({
    onError: (error) => {
      toast('Error signing typed data: ' + error.message, { type: 'error' });
    }
  });

  const { write } = useContractWrite({
    address: LENS_HUB_MUMBAI,
    abi: LensHubProxy,
    functionName: 'postWithSig',
    mode: 'recklesslyUnprepared',
    onSuccess: () => {
      toast('posted successfully');
    },
    onError: (error) => {
      toast(`Error posting publication: ${error.message}`);
    }
  });

  const [broadcast] = useMutation(BROADCAST_TRANSACTION, {
    onCompleted: (data) => {
      if (data.broadcast.__typename === 'RelayerResult') {
        setTxnQueue([
          generateTxnQueData({
            txHash: data.broadcast.txHash,
            txId: data.broadcast.txId,
            publicationContent,
            attachments: []
          }),
          ...txnQueue
        ]);
        setPublicationContent('');
      }
    }
  });

  const typedDataGenerator = async (generatedData) => {
    const { id, typedData } = generatedData;
    const {
      profileId,
      contentURI,
      collectModule,
      collectModuleInitData,
      referenceModule,
      referenceModuleInitData,
      deadline
    } = typedData.value;
    const signature = await signTypedDataAsync(getSignature(typedData));
    const { v, r, s } = splitSignature(signature);
    const sig = { v, r, s, deadline };
    const inputStruct = {
      profileId,
      contentURI,
      collectModule,
      collectModuleInitData,
      referenceModule,
      referenceModuleInitData,
      sig
    };
    setUserSigNonce(userSigNonce + 1);
    const { data } = await broadcast({ variables: { request: { id, signature } } });
    if (data?.broadcast.__typename === 'RelayError') {
      return write?.({ recklesslySetUnpreparedArgs: [inputStruct] });
    }
  };

  const [createPostTypedData] = useMutation(CREATE_PUBLICATION, {
    onCompleted: async ({ createPostTypedData }) => await typedDataGenerator(createPostTypedData)
  });

  const createMetadata = async (metadata) => {
    return await uploadToIPFS(metadata);
  };

  const createPublication = async () => {
    if (!currentProfile) {
      toast.error('Please sign in your wallet.');
      return;
    }
    try {
      setLoading(true);
      if (publicationContent.length === 0) {
        toast.error('Please write something.');
        return;
      }
      const metadata = {
        version: '2.0.0',
        mainContentFocus: 'TEXT_ONLY',
        metadata_id: nanoid(),
        description: 'RTU Connect Post',
        locale: 'en-US',
        content: publicationContent,
        external_url: `https://rtu-connect-v2.vercel.app/user/${currentProfile?.handle}`,
        image: null,
        imageMimeType: null,
        name: `Posted by ${currentProfile?.name}`,
        contentWarning: null,
        attributes: [
          {
            traitType: 'string',
            key: 'type',
            value: 'post'
          }
        ],
        media: null,
        appId: 'rtutest'
      };
      const metadataURI = await createMetadata(metadata);

      const createPostTypedDataRequest = {
        profileId: currentProfile?.id,
        contentURI: `ipfs://${metadataURI.IpfsHash}`,
        collectModule: {
          freeCollectModule: {
            followerOnly: true
          }
        },
        referenceModule: {
          followerOnlyReferenceModule: false
        }
      };

      return await createPostTypedData({
        variables: { options: { overrideSigNonce: userSigNonce }, createPostTypedDataRequest }
      });
    } catch (error) {
      toast.error(`Error creating publication: ${error.message}`);
    } finally {
      setLoading(false);
      setShowLoginModal(!showLoginModal);
    }
  };

  const isLoading = loading || typedDataLoading;

  return (
    <>
      <Modal
        title={APP_NAME}
        icon={<Image height={30} width={30} src={rtuLogo} alt={'RTU Logo'} />}
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <Editor />
        <div className={'block items-center sm:flex px-5'}>
          <div className={'ml-auto pt-2 sm:pt-0'}>
            <Button loading={isLoading} disabled={isLoading} onClick={createPublication}>
              {isLoading ? <Spinner /> : 'Post'}
            </Button>
          </div>
        </div>
        <div className={'py-5'} />
      </Modal>
      <Card className={'p-5 space-y-3 !rounded-xl'}>
        <div className={'flex items-center space-x-3'}>
          <Link href={`/user/${currentProfile?.handle}`}>
            <img
              src={getAvatarUrl(currentProfile)}
              loading={'lazy'}
              className={'w-9 h-9 bg-gray-200 rounded-full border sm:w-12 sm:h-12'}
              alt={fixUsername(currentProfile?.handle)}
            />
          </Link>
          <button
            className={
              'w-full flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200'
            }
            onClick={() => setShowLoginModal(!showLoginModal)}
          >
            <span className={'text-gray-400'}>
              {`What's on your mind?, ${currentProfile?.handle.replace('.test', '')}`}
            </span>
          </button>
        </div>
      </Card>
    </>
  );
}

export default NewPublication;
