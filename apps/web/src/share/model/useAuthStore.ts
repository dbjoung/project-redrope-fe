import type { UserType } from "@redrope/shared";
import { create } from "zustand/react";

type AuthStore = {
  accessToken: string | null;
  user: UserType | null;

  action: {
    setToken: (accessToken: string) => void;
    setUser: (user: UserType) => void;
    getToken: () => { accessToken: string | null };
    getUser: () => UserType | null;
    clearAuth: () => void;
  };
};

export const useAuthStore = create<AuthStore>((set, get) => {
  return {
    accessToken: null,
    user: null,
    action: {
      setToken: (accessToken: string) => {
        set({ accessToken });
      },
      setUser: (user: UserType) => set({ user }),
      getToken: () => ({ accessToken: get().accessToken }),
      getUser: () => get().user,
      clearAuth: () => set({ accessToken: null, user: null }),
    },
  };
});
