import { gql } from '@apollo/client';

export const TestProfileFeedQuery = gql`
  query Publications {
    publications(request: { profileId: "0x09", publicationTypes: [POST, COMMENT, MIRROR], limit: 10 }) {
      items {
        __typename
        ... on Post {
          reaction(request: { profileId: "0x01" })
        }
        ... on Comment {
          reaction(request: { profileId: "0x01" })
        }
        ... on Mirror {
          reaction(request: { profileId: "0x01" })
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
