import { useMutation } from '@apollo/client';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useContractWrite, useSignTypedData } from 'wagmi';

import { BROADCAST_TRANSACTION } from '../../../graphQL/mutations/broadcast-transaction';
import { CREATE_COMMENT } from '../../../graphQL/mutations/create-comment';
import { useAppStore } from '../../../store/app';
import LensHubProxy from '../../../utils/abis/LensHubProxy.json';
import { LENS_HUB_MUMBAI } from '../../../utils/constants';
import { getSignature, splitSignature, uploadToIPFS } from '../../../utils/helpers';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Spinner from '../../UI/Spinner';
import Editor from '../index';

function NewComment({ publication }) {
  const publicationContent = useAppStore((state) => state.publicationContent);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  // States
  const [loading, setLoading] = useState(false);

  const { signTypedDataAsync, isLoading: typedDataLoading } = useSignTypedData({
    onError: (error) => {
      toast('Error signing typed data: ' + error.message, { type: 'error' });
    }
  });

  const { write } = useContractWrite({
    address: LENS_HUB_MUMBAI,
    abi: LensHubProxy,
    functionName: 'commentWithSig',
    mode: 'recklesslyUnprepared',
    onSuccess: () => {
      toast('posted successfully');
    },
    onError: (error) => {
      toast(`Error posting Comment: ${error.message}`);
    }
  });

  const [broadcast] = useMutation(BROADCAST_TRANSACTION, {
    onCompleted: ({ broadcast }) => {
      if (broadcast.__typename === 'RelayError') {
        toast.error(broadcast.reason);
      } else {
        toast.success('Broadcast Transaction Successful');
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

  const [createCommentTypedData] = useMutation(CREATE_COMMENT, {
    onCompleted: async ({ createCommentTypedData }) => await typedDataGenerator(createCommentTypedData)
  });

  const createMetadata = async (metadata) => {
    return await uploadToIPFS(metadata);
  };

  const createComment = async () => {
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

      const createCommentTypedDataRequest = {
        profileId: currentProfile.id,
        ...{
          publicationId: publication.__typename === 'Mirror' ? publication?.mirrorOf?.id : publication?.id
        },
        contentURI: `ipfs://${metadataURI.IpfsHash}`,
        collectModule: {
          revertCollectModule: true
        },
        referenceModule: {
          followerOnlyReferenceModule: false
        }
      };

      return await createCommentTypedData({
        variables: { options: { overrideSigNonce: userSigNonce }, createCommentTypedDataRequest }
      });
    } catch (error) {
      toast.error(`Error creating Comment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = loading || typedDataLoading;
  return (
    <Card className={'border-none rounded-none pb-3'}>
      <Editor />
      <div className={'block items-center sm:flex px-5'}>
        <div className={'ml-auto pt-2 sm:pt-0'}>
          <Button loading={isLoading} disabled={isLoading} onClick={createComment}>
            {isLoading ? <Spinner /> : 'Comment'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default NewComment;
