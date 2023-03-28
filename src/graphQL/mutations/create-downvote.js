import { gql } from '@apollo/client';

export const CREATE_DOWNVOTE = gql`
  mutation RemoveReaction($request: ReactionRequest!) {
    removeReaction(request: $request)
  }
`;
