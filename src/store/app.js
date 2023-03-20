import create from 'zustand';
import { persist } from 'zustand/middleware';

import { LS_KEYS } from '../utils/constants';

export const useAppStore = create((set) => ({
  profiles: [],
  setProfiles: (profiles) => set(() => ({ profiles })),
  currentProfile: null,
  setCurrentProfile: (currentProfile) => set(() => ({ currentProfile })),
  userSigNonce: 0,
  setUserSigNonce: (userSigNonce) => set(() => ({ userSigNonce })),
  publicationContent: '',
  setPublicationContent: (publicationContent) => set(() => ({ publicationContent }))
}));

export const useAppPersistStore = create(
  persist(
    (set) => ({
      profileId: null,
      setProfileId: (profileId) => set(() => ({ profileId })),
      txnQueue: [],
      setTxnQueue: (txnQueue) => set(() => ({ txnQueue }))
    }),
    { name: LS_KEYS.RTU_CONNECT_STORE }
  )
);
