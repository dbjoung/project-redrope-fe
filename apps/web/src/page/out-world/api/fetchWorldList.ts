import { unWarp } from "@/share/lib/unWrap";
import type { WorldSummaryType } from "@redrope/shared/dist/world";
import type { ClientType } from "@/share/model/useClient";

export async function fetchWorldList(client: ClientType): Promise<WorldSummaryType[]> {
  const res = await client.request<WorldSummaryType[]>("fetchWorldList", `/api/v1/world`);

  return unWarp<WorldSummaryType[]>(res);
}
