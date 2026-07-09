import { unWarp, type ApiRequest } from "@/share/lib/unWrap";
import type { ClientType } from "@/share/model/useClient";

export type WorldCardType = {
  id: number;
  title: string;
  imageUrl: string;
  writer: string;
  description: string;
};

export async function fetchWorldList(
  client: ClientType<ApiRequest<WorldCardType[]>>,
): Promise<WorldCardType[]> {
  const res = await client.request("fetchWorldList", `/api/v1/worlds`);

  return unWarp<WorldCardType[]>(res);
}
