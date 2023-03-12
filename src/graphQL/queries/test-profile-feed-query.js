import { gql } from '@apollo/client';

export const TestProfileFeedQuery = gql`
  query Publications($request: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest) {
    publications(request: $request) {
      items {
        __typename
        ... on Post {
          reaction(request: $reactionRequest)
        }
        ... on Comment {
          reaction(request: $reactionRequest)
        }
        ... on Mirror {
          reaction(request: $reactionRequest)
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;
