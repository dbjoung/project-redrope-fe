import { create } from "zustand/react";

type AuthStore = {
  accessToken: string | null;
  refreshToken: string | null;
  action: {
    setTokens: (accessToken: string, refreshToken?: string) => void;
    getTokens: () => { accessToken: string | null; refreshToken: string | null };
    clearAccessToken: () => void;
  };
};

export const useAuthStore = create<AuthStore>((set, get) => {
  return {
    accessToken: null,
    refreshToken: null,
    action: {
      setTokens: (accessToken: string, refreshToken?: string) => {
        if (refreshToken) set({ accessToken, refreshToken });
        else set({ accessToken });
      },
      getTokens: () => ({ accessToken: get().accessToken, refreshToken: get().refreshToken }),
      clearAccessToken: () => set({ accessToken: null, refreshToken: null }),
    },
  };
});
