// infinite scroll
import * as chain from '@wagmi/chains';

export const SCROLL_THRESHOLD = 0.5;
export const DATA_LIMIT = 50;
// lens protocol
export const API_URL = 'https://api-mumbai.lens.dev/';

// alchemy
export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const ALCHEMY_RPC = `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`;

// firebase
export const RTU_CONNECT_MEDIA = 'media';
export const RTU_CONNECT_PROFILE = 'profile';

// polygon
export const FAUCET = 'https://faucet.polygon.technology';
export const POLYGON_MUMBAI = {
  ...chain.polygonMumbai,
  name: 'Polygon Mumbai',
  rpcUrls: { default: 'https://rpc-mumbai.maticvigil.com' }
};

export const CHAIN_ID = 80001;

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const NFT_STORAGE_GATEWAY = 'https://nftstorage.link/ipfs/';

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
      }
    ]
  }
};

export const BLOCK_LIST_URL = [
  'https://test.com',
  'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan'
];

export const VERIFIED_PROFILES = ['0x43d0'];
