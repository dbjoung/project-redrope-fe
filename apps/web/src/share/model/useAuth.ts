import { useAuthStore } from "@/share/model/useAuthStore";
import { useClient } from "@/share/model/useClient";
import type { ResponseUserType } from "@redrope/shared";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { CustomError } from "../lib/CustomError";

export function useAuth() {
  const { request } = useClient<ResponseUserType>();
  const { user, action } = useAuthStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      user: state.user,
      action: state.action,
    })),
  );

  const navigate = useNavigate();

  const {
    mutate: in_mutate,
    isPending: in_isPending,
    isError: in_isError,
  } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      await request("Login", "/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
    },
    onSuccess: () => {
      navigate("/worlds", {
        replace: true,
      });
    },
    onError: () => {
      throw new CustomError("로그인", "로그인에 문제가 생겼습니다.");
    },
  });

  const {
    mutate: out_mutate,
    isPending: out_isPending,
    isError: out_isError,
  } = useMutation({
    mutationFn: async () => {
      await request("Logout", "/api/v1/auth/logout");
    },
    onSuccess: () => {
      action.clearAuth();
      navigate("/login", {
        replace: true,
      });
    },
    onError: () => {
      throw new CustomError("로그아웃", "로그아웃에 문제가 생겼습니다.");
    },
  });

  const getUser = useCallback(() => user, [user]);

  const loginMutate = {
    login: in_mutate,
    isPending: in_isPending,
    isError: in_isError,
  };

  const logoutMutate = {
    logout: out_mutate,
    isPending: out_isPending,
    isError: out_isError,
  };

  return { user, getUser, loginMutate, logoutMutate };
}
