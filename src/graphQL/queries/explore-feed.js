import { gql } from '@apollo/client';

export const EXPLORE_FEED = gql`
  query Feed($feedRequest: FeedRequest!) {
    feed(request: $feedRequest) {
      items {
        root {
          ... on Post {
            ...PostFields
            __typename
          }
          ... on Comment {
            ...CommentFields
            __typename
          }
          __typename
        }
        electedMirror {
          mirrorId
          profile {
            id
            handle
            __typename
          }
          timestamp
          __typename
        }
        mirrors {
          profile {
            id
            handle
            __typename
          }
          timestamp
          __typename
        }
        collects {
          profile {
            id
            handle
            __typename
          }
          timestamp
          __typename
        }
        reactions {
          profile {
            id
            handle
            __typename
          }
          reaction
          timestamp
          __typename
        }
        comments {
          ...CommentFields
          __typename
        }
        __typename
      }
      pageInfo {
        prev
        next
        totalCount
        __typename
      }
      __typename
    }
  }

  fragment MediaFields on Media {
    url
    mimeType
    __typename
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
      __typename
    }
    isFollowedByMe
    isFollowing(who: null)
    followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
        __typename
      }
      ... on MediaSet {
        original {
          ...MediaFields
          __typename
        }
        __typename
      }
      __typename
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
        __typename
      }
      ... on MediaSet {
        original {
          ...MediaFields
          __typename
        }
        __typename
      }
      __typename
    }
    ownedBy
    dispatcher {
      address
      __typename
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
      __typename
    }
    followModule {
      ...FollowModuleFields
      __typename
    }
    __typename
  }

  fragment PublicationStatsFields on PublicationStats {
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
    __typename
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
        __typename
      }
      __typename
    }
    attributes {
      displayType
      traitType
      value
      __typename
    }
    __typename
  }

  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
    __typename
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
      __typename
    }
    stats {
      ...PublicationStatsFields
      __typename
    }
    metadata {
      ...MetadataOutputFields
      __typename
    }
    createdAt
    collectModule {
      ...CollectModuleFields
      __typename
    }
    referenceModule {
      ...ReferenceModuleFields
      __typename
    }
    appId
    collectedBy {
      ...WalletFields
      __typename
    }
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
    __typename
  }

  fragment MirrorBaseFields on Mirror {
    id
    profile {
      ...ProfileFields
      __typename
    }
    stats {
      ...PublicationStatsFields
      __typename
    }
    metadata {
      ...MetadataOutputFields
      __typename
    }
    createdAt
    collectModule {
      ...CollectModuleFields
      __typename
    }
    referenceModule {
      ...ReferenceModuleFields
      __typename
    }
    appId
    hidden
    reaction(request: null)
    hasCollectedByMe
    __typename
  }

  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
      __typename
    }
    stats {
      ...PublicationStatsFields
      __typename
    }
    metadata {
      ...MetadataOutputFields
      __typename
    }
    createdAt
    collectModule {
      ...CollectModuleFields
      __typename
    }
    referenceModule {
      ...ReferenceModuleFields
      __typename
    }
    appId
    collectedBy {
      ...WalletFields
      __typename
    }
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
    __typename
  }

  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
        __typename
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
            ...PostFields
            __typename
          }
          ... on Comment {
            ...CommentMirrorOfFields
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }

  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
        __typename
      }
      ... on Mirror {
        ...MirrorBaseFields
        __typename
      }
      __typename
    }
    __typename
  }

  fragment WalletFields on Wallet {
    address
    defaultProfile {
      ...ProfileFields
      __typename
    }
    __typename
  }

  fragment FollowModuleFields on FollowModule {
    ... on FeeFollowModuleSettings {
      type
      amount {
        asset {
          name
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      recipient
      __typename
    }
    ... on ProfileFollowModuleSettings {
      type
      contractAddress
      __typename
    }
    ... on RevertFollowModuleSettings {
      type
      contractAddress
      __typename
    }
    ... on UnknownFollowModuleSettings {
      type
      contractAddress
      followModuleReturnData
      __typename
    }
    __typename
  }

  fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
      type
      followerOnly
      contractAddress
      __typename
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
          __typename
        }
        value
        __typename
      }
      recipient
      referralFee
      __typename
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
          __typename
        }
        value
        __typename
      }
      recipient
      referralFee
      __typename
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
          __typename
        }
        value
        __typename
      }
      recipient
      referralFee
      endTimestamp
      __typename
    }
    ... on RevertCollectModuleSettings {
      type
      __typename
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
          __typename
        }
        value
        __typename
      }
      recipient
      referralFee
      endTimestamp
      __typename
    }
    ... on UnknownCollectModuleSettings {
      type
      contractAddress
      collectModuleReturnData
      __typename
    }
  }

  fragment ReferenceModuleFields on ReferenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
      contractAddress
      __typename
    }
    ... on UnknownReferenceModuleSettings {
      type
      contractAddress
      referenceModuleReturnData
      __typename
    }
    ... on DegreesOfSeparationReferenceModuleSettings {
      type
      contractAddress
      commentsRestricted
      mirrorsRestricted
      degreesOfSeparation
      __typename
    }
    __typename
  }
`;
