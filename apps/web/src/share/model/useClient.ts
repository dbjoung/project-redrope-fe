import type { ApiResponse } from "@redrope/shared";
import { CustomError } from "../lib/CustomError";
import { useAuthStore } from "../model/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL || "";

export type ClientType<T> = {
  request: (from: string, url: string, options?: RequestInit) => Promise<T>;
};

export const useClient = <T>(): ClientType<ApiResponse<T>> => {
  const getTokens = useAuthStore((state) => state.action.getToken);
  return {
    request: async (from: string, url: string, options?: RequestInit) => {
      const initOptions = options ?? {};
      try {
        const res = await fetch(`${API_URL}${url}`, {
          method: "GET",
          ...initOptions,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokens().accessToken ?? ""}`,
            ...initOptions.headers,
          },
          credentials: "include",
        });

        const toJson = await res.json();
        if (!res.ok) throw new CustomError(from, toJson.message);

        return toJson;
      } catch (e) {
        if (e instanceof CustomError) throw e;

        throw new CustomError(from, "API 통신 중 오류가 발생했습니다.");
      }
    },
  };
};
