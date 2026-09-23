import { create } from "zustand/react";

type MySettingStore = {
  email: string;
  nickname: string;
  action: {
    setAll: (email: string, nickname: string) => void;
    setNickname: (nickname: string) => void;
  };
};

export const useMySettingStore = create<MySettingStore>((set) => {
  return {
    email: "dasol315@naver.com",
    nickname: "정아으",
    action: {
      setAll: (email: string, nickname: string) => set({ email, nickname }),
      setNickname: (nickname: string) => set({ nickname }),
    },
  };
});
