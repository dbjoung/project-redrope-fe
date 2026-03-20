import { create } from "zustand/react";

type AuthStore = {
  accessToken: string | null;
  action: {
    setAccessToken: (accessToken: string) => void;
    clearAccessToken: () => void;
  };
};

export const useAuthStore = create<AuthStore>((set) => {
  return {
    accessToken: null,
    action: {
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clearAccessToken: () => set({ accessToken: null }),
    },
  };
});
