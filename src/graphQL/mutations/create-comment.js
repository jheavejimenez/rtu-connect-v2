import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateCommentTypedData($createCommentTypedDataRequest: CreatePublicCommentRequest!) {
    createCommentTypedData(request: $createCommentTypedDataRequest) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
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
          profileIdPointed
          pubIdPointed
          contentURI
          referenceModuleData
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`;
