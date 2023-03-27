import { gql } from '@apollo/client';

export const CREATE_UPVOTE = gql`
  mutation AddReaction($request: ReactionRequest!) {
    addReaction(request: $request)
  }
`;
