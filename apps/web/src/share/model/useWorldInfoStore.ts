import { create } from "zustand/react";

type CategoryType = {
  id: number;
  iconId: number;
  name: string;
};

export type WorldInfoType = {
  id: number;
  title: string;
  writer: string;
  categories: CategoryType[];
};

type WorldInfoStore = {
  worldInfo: WorldInfoType | null;
  action: {
    setWorldInfo: (worldInfo: WorldInfoType) => void;
    getWorldInfo: () => WorldInfoType | null;
  };
};

export const useWorldInfoStore = create<WorldInfoStore>((set, get) => {
  return {
    worldInfo: null,
    action: {
      setWorldInfo: (worldInfo: WorldInfoType) => set({ worldInfo }),
      getWorldInfo: () => get().worldInfo,
    },
  };
});
