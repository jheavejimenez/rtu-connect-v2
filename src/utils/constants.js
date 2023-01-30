import { chain } from 'wagmi';

// infinite scroll
export const SCROLL_THRESHOLD = 0.5;

// lens protocol
export const API_URL = 'https://api-mumbai.lens.dev/';

// alchemy
export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const ALCHEMY_RPC = `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`;

// polygon
export const FAUCET = 'https://faucet.polygon.technology';
export const POLYGON_MUMBAI = {
  ...chain.polygonMumbai,
  name: 'Polygon Mumbai',
  rpcUrls: { default: 'https://rpc-mumbai.maticvigil.com' }
};

export const CHAIN_ID = POLYGON_MUMBAI.id;

export const APP_NAME = 'RTU Connect';

export const GITBOOK = 'https://jhv.gitbook.io/rtu-connect';

export const ALLOWED_MEDIA_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm'
];
