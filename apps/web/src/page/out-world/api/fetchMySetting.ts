import { unWarp } from "@/share/lib/unWrap";
import type { ClientType } from "@/share/model/useClient";
import type { UserType } from "@redrope/shared/dist/user";

export const fetchMySetting = async (client: ClientType) => {
  const res = await client.request<UserType>("fetchMySetting", "/api/v1/user");

  return unWarp(res);
};
