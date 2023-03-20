import { gql } from '@apollo/client';

export const CREATE_PUBLICATION = gql`
  mutation CreatePostTypedData($createPostTypedDataRequest: CreatePublicPostRequest!) {
    createPostTypedData(request: $createPostTypedDataRequest) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`;
