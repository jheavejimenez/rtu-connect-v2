import create from 'zustand';

export const useAuthStore = create((set) => ({
  showSignupModal: false,
  setShowSignupModal: (showSignupModal) => set(() => ({ showSignupModal: showSignupModal })),
  loginRequested: false,
  setLoginRequested: (loginRequested) => set(() => ({ loginRequested: loginRequested })),
  signingInProgress: false,
  setSigningInProgress: (signingInProgress) => set(() => ({ signingInProgress: signingInProgress }))
}));
