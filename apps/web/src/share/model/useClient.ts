import { CustomError } from "../lib/CustomError";
import { useAuthStore } from "../model/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL || "";
const POSTMAN_API_KEY = import.meta.env.VITE_POSTMAN_API_KEY || "";

export type ClientType<T> = {
  request: (from: string, url: string, options?: RequestInit) => Promise<T>;
};

export const useClient = <T>(): ClientType<T> => {
  console.log(API_URL, POSTMAN_API_KEY);
  const getTokens = useAuthStore((state) => state.action.getTokens);
  return {
    request: async (from: string, url: string, options?: RequestInit) => {
      const initOptions = options ?? {};
      const res = await fetch(`${API_URL}${url}`, {
        ...initOptions,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": getTokens().accessToken ?? POSTMAN_API_KEY,
          ...initOptions.headers,
        },
        body: initOptions.body,
      });

      if (!res.ok) throw new CustomError(from, res);

      const toJson = await res.json();

      if (toJson) return toJson;
      else throw new CustomError(from, "JSON 변환이 잘못됐습니다.");
    },
  };
};
