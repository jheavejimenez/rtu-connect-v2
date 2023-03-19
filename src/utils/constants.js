// infinite scroll
import * as chain from '@wagmi/chains';

export const SCROLL_THRESHOLD = 0.5;

export const DATA_LIMIT = 100;

// lens protocol
export const API_URL = 'https://api-mumbai.lens.dev/';

export const LENS_HUB_MUMBAI = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

// alchemy
export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const ALCHEMY_RPC = `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`;

// firebase
export const RTU_CONNECT_MEDIA = 'media';
export const RTU_CONNECT_PROFILE = 'profile';

// local storage
export const LS_KEYS = {
  RTU_CONNECT_STORE: 'rtu.store'
};

// polygon
export const FAUCET = 'https://faucet.polygon.technology';
export const POLYGON_MUMBAI = {
  ...chain.polygonMumbai,
  name: 'Polygon Mumbai',
  rpcUrls: { default: 'https://rpc-mumbai.maticvigil.com' }
};
export const CHAIN_ID = 80001;
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// IPFS
export const NFT_STORAGE_GATEWAY = 'https://nftstorage.link/ipfs/';
export const IPFS_GATEWAY = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

// RTU Connect
export const APP_NAME = 'RTU Connect';
export const GITBOOK = 'https://jhv.gitbook.io/rtu-connect';
export const ALLOWED_VIDEO_TYPES = ['video/quicktime', 'video/mp4', 'video/mpeg', 'video/ogg', 'video/webm'];

// Recommended Profiles

export const RECOMMENDED_PROFILES = {
  data: {
    recommendedProfiles: [
      {
        id: '0x43d0',
        name: null,
        bio: null,
        metadata: null,
        followNftAddress: '0x43E3C0aF415e888890651Fa1CeF11Cd8F8C6bDaf',
        ownedBy: '0xAE32c7CB4B71299EbC1f79eD7165490df4c59D1D',
        isFollowedByMe: false,
        isFollowing: false,
        attributes: [],
        dispatcher: null,
        isDefault: false,
        handle: 'jheave.test',
        picture: null,
        coverPicture: null,
        followModule: null,
        __typename: 'Profile',
        stats: {
          totalFollowers: 2,
          totalFollowing: 0,
          totalPosts: 4,
          totalComments: 2,
          totalMirrors: 0,
          __typename: 'ProfileStats'
        }
      },
      {
        id: '0x4fb0',
        name: null,
        bio: null,
        attributes: [],
        followNftAddress: null,
        metadata: null,
        isDefault: false,
        picture: null,
        handle: 'chadie.test',
        coverPicture: null,
        ownedBy: '0x29f45DfE96BDB710180553804CBA6c2359715cEE',
        dispatcher: null,
        stats: {
          totalFollowers: 0,
          totalFollowing: 0,
          totalPosts: 1,
          totalComments: 0,
          totalMirrors: 0,
          totalPublications: 1,
          totalCollects: 0,
          __typename: 'ProfileStats'
        },
        followModule: null,
        __typename: 'Profile'
      },
      {
        id: '0x50d9',
        name: null,
        bio: null,
        attributes: [],
        followNftAddress: null,
        metadata: null,
        isDefault: false,
        picture: null,
        handle: 'eloquade.test',
        coverPicture: null,
        ownedBy: '0xa89015f9f0Ff20e7D3a234C719a7175CCe5a9046',
        dispatcher: null,
        stats: {
          totalFollowers: 0,
          totalFollowing: 0,
          totalPosts: 2,
          totalComments: 0,
          totalMirrors: 0,
          totalPublications: 2,
          totalCollects: 0,
          __typename: 'ProfileStats'
        },
        followModule: null,
        __typename: 'Profile'
      },
      {
        id: '0x5012',
        name: null,
        bio: null,
        attributes: [],
        followNftAddress: null,
        metadata: null,
        isDefault: false,
        picture: null,
        handle: 'testdarell.test',
        coverPicture: null,
        ownedBy: '0x71cCfBC763F4721498d76b2e3D031fd312B965B5',
        dispatcher: null,
        stats: {
          totalFollowers: 0,
          totalFollowing: 0,
          totalPosts: 2,
          totalComments: 1,
          totalMirrors: 0,
          totalPublications: 3,
          totalCollects: 0,
          __typename: 'ProfileStats'
        },
        followModule: null,
        __typename: 'Profile'
      }
    ]
  }
};

export const BLOCK_LIST_URL = [
  'https://test.com',
  'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  'https://avatar.tobi.sh/tiktoko.png'
];

export const VERIFIED_PROFILES = ['0x43d0', '0x4fb0', '0x50d9', '0x5012'];
