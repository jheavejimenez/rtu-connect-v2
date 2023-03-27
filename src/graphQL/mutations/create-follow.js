import { gql } from '@apollo/client';

export const CREATE_FOLLOW = gql`
  mutation CreateSetFollowModuleTypedData($request: CreateSetFollowModuleRequest!) {
    createSetFollowModuleTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetFollowModuleWithSig {
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
          followModule
          followModuleInitData
        }
      }
    }
  }
`;
