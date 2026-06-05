import { CustomError } from "@/share/lib/CustomError";
import { unWarp, type ApiRequest } from "@/share/lib/unWrap";
import type { ClientType } from "@/share/model/useClient";
import type { WorldInfoType } from "@/share/model/useWorldInfoStore";

export async function fetchWorldInfo(
  client: ClientType<ApiRequest<WorldInfoType>>,
  worldId: string | undefined,
): Promise<WorldInfoType> {
  if (!worldId) throw new CustomError("fetchWorldInfo", "worldId가 없습니다.");

  const res = await client.request("fetchWorldInfo", `/api/v1/worlds/${worldId}`);

  return unWarp<WorldInfoType>(res);
}
