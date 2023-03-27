import { gql } from '@apollo/client';

export const CREATE_MIRROR = gql`
  mutation CreateMirrorTypedData($createMirrorTypedDataRequest: CreateMirrorRequest!) {
    createMirrorTypedData(request: $createMirrorTypedDataRequest) {
      id
      expiresAt
      typedData {
        types {
          MirrorWithSig {
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
          referenceModule
          referenceModuleData
          referenceModuleInitData
        }
      }
    }
  }
`;
