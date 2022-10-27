import create from 'zustand';

export const useAppStore = create((set) => ({
  profiles: [],
  setProfiles: (profiles) => set({ profiles }),
  currentProfile: null,
  setCurrentProfile: (currentProfile) => set({ currentProfile }),
  userSigNonce: 0,
  setUserSigNonce: (userSigNonce) => set(() => ({ userSigNonce }))
}));
