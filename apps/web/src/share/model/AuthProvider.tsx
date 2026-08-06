import { createContext, type ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "./useAuthStore";
import type { ResponseUserType, UserType } from "@redrope/shared";
import { useClient } from "./useClient";
import { useShallow } from "zustand/react/shallow";
import { unWarp } from "../lib/unWrap";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext<UserType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { accessToken, user, setUser, setToken } = useAuthStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      user: state.user,
      setUser: state.action.setUser,
      setToken: state.action.setToken,
    })),
  );

  const { request } = useClient<ResponseUserType>();

  const { isPending, isError } = useQuery({
    queryKey: ["authRefresh"],
    queryFn: async () => {
      const res = await request("AuthProvider", "/api/v1/auth/refresh");
      const { accessToken, ...user } = unWarp(res);
      setToken(accessToken);
      setUser(user);
      return { accessToken, ...user };
    },
    enabled: !accessToken,
  });

  if (isPending) return <section>로딩중 ...</section>;
  if (isError) return <Navigate to={"/login"} replace />;

  return <AuthContext value={user}>{children}</AuthContext>;
}
