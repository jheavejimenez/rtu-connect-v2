import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create((set) => ({
  profile: [],
  setProfiles: (profile) => set({ profile }),
  currentProfile: null,
  setCurrentProfile: (currentProfile) => set({ currentProfile }),
  userSigNonce: 0,
  setUserSigNonce: (userSigNonce) => set(() => ({ userSigNonce }))
}));

export const useAppPersistStore = create(
  persist(
    (set) => ({
      profileId: null,
      setProfileId: (profileId) => set(() => ({ profileId })),
      notificationCount: 0,
      setNotificationCount: (notificationCount) => set(() => ({ notificationCount }))
    }),
    { name: 'rtuconnect.store' }
  )
);
