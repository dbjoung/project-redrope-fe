import { unWarp, type ApiRequest } from "@/share/lib/unWrap";
import type { ClientType } from "@/share/model/useClient";

export type EntityCardType = {
  id: number;
  title: string;
  imageUrl: string;
  writer: string;
  description: string;
};

export type CategoryInfoType = {
  title: string;
  iconId: number;
  description: string;
  entityList: EntityCardType[];
};

export async function fetchCategoryInfo(
  client: ClientType<ApiRequest<CategoryInfoType>>,
  worldId: number,
  categoryId: number,
): Promise<CategoryInfoType> {
  const res = await client.request("fetchWorldList", `/api/v1/worlds/${worldId}/${categoryId}`);

  return unWarp<CategoryInfoType>(res);
}
