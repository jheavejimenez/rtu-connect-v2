import { gql } from '@apollo/client';

export const GET_CHALLENGE = gql`
  query ($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`;

export const AUTHENTICATION = gql`
  mutation ($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const refresh = `
  mutation($request: Jwt!) {
    refresh(request: {
      refreshToken: $refreshToken
    }) {
      accessToken
      refreshToken
    }
  }
`;
