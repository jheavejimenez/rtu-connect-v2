export const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return accessToken !== 'undefined' && refreshToken !== 'undefined';
};

export const clearLocalStorage = (keys) => {
  for (const key of keys) {
    localStorage.removeItem(key);
  }
};

export const setLocalStorage = (keys, values) => {
  for (const [i, key] of keys.entries()) {
    localStorage.setItem(key, values[i]);
  }
};

// check if jwt token is expired
export const isTokenExpired = (token) => {
  const payloadBase64 = token.split('.')[1];
  const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
  const decoded = JSON.parse(decodedJson);
  const exp = decoded.exp;
  return Date.now() >= exp * 1000;
};

/**
 *
 * @param value - Value to trim
 * @returns trimmed value
 * @description - remove any whitespace characters from the beginning and end of the "value" string,
 *  but it will only remove newline characters that are preceded and followed by at least one whitespace character,
 *  so it will not remove any newline characters that are not surrounded by whitespace.
 *
 */
export const contentFormatter = (value) => value.replace(/(?:\r?\n[\t ]*){2,}/g, '\n\n').trim();
export const publications = [
  {
    items: [
      {
        id: '0x1b-0x011d',
        profile: {
          id: '0x1b',
          name: null,
          handle: 'jhv.test',
          bio: null,
          ownedBy: '0x00000000000000',
          isFollowedByMe: false,
          stats: { totalFollowers: 33, totalFollowing: 28, __typename: 'ProfileStats' },
          attributes: [],
          picture: {
            original: {
              url: 'https://profile',
              __typename: 'Media'
            },
            __typename: 'MediaSet'
          },
          followModule: { __typename: 'FeeFollowModuleSettings' },
          __typename: 'Profile'
        },
        reaction: null,
        mirrors: [],
        hasCollectedByMe: false,
        onChainContentURI: 'https://arweave.net/test',
        canComment: { result: false, __typename: 'CanCommentResponse' },
        canMirror: { result: false, __typename: 'CanMirrorResponse' },
        collectedBy: null,
        collectModule: { __typename: 'RevertCollectModuleSettings' },
        stats: {
          totalUpvotes: 0,
          totalAmountOfMirrors: 0,
          totalAmountOfCollects: 0,
          totalAmountOfComments: 0,
          __typename: 'PublicationStats'
        },
        metadata: {
          name: 'none',
          description: null,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          image: null,
          attributes: [],
          cover: null,
          media: [],
          encryptionParams: null,
          __typename: 'MetadataOutput'
        },
        hidden: false,
        createdAt: '2023-01-04T13:15:08.000Z',
        appId: null,
        __typename: 'Post',
        collectNftAddress: null,
        referenceModule: null
      },
      {
        id: '0x1b-0x011d',
        profile: {
          id: '0x1b',
          name: null,
          handle: 'jhv.test',
          bio: null,
          ownedBy: '0x00000000000000',
          isFollowedByMe: false,
          stats: { totalFollowers: 33, totalFollowing: 28, __typename: 'ProfileStats' },
          attributes: [],
          picture: {
            original: {
              url: 'https://profile',
              __typename: 'Media'
            },
            __typename: 'MediaSet'
          },
          followModule: { __typename: 'FeeFollowModuleSettings' },
          __typename: 'Profile'
        },
        reaction: null,
        mirrors: [],
        hasCollectedByMe: false,
        onChainContentURI: 'https://arweave.net/test',
        canComment: { result: false, __typename: 'CanCommentResponse' },
        canMirror: { result: false, __typename: 'CanMirrorResponse' },
        collectedBy: null,
        collectModule: { __typename: 'RevertCollectModuleSettings' },
        stats: {
          totalUpvotes: 0,
          totalAmountOfMirrors: 0,
          totalAmountOfCollects: 0,
          totalAmountOfComments: 0,
          __typename: 'PublicationStats'
        },
        metadata: {
          name: 'none',
          description: null,
          content:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          image: null,
          attributes: [],
          cover: null,
          media: [],
          encryptionParams: null,
          __typename: 'MetadataOutput'
        },
        hidden: false,
        createdAt: '2023-01-04T13:15:08.000Z',
        appId: null,
        __typename: 'Post',
        collectNftAddress: null,
        referenceModule: null
      }
    ]
  }
];
