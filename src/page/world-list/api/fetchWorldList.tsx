import { CustomError } from "@/share/lib/CustomError";
import type { ApiRequest } from "@/share/lib/unWrap";

export type WorldCardType = {
  id: number;
  title: string;
  imageUrl: string;
  writer: string;
  description: string;
};

export async function fetchWorldList(): Promise<ApiRequest<WorldCardType[]>> {
  const res = await fetch(
    "https://2ccb949e-e706-4c02-a5e6-33dbbfebfdde.mock.pstmn.io/api/v1/worlds",
    {
      headers: {
        "x-api-key": "PMAK-69bd271c117823950001facbd6-6d790b8134c3e17c88a8b6bd50be7b6dc9",
      },
    },
  );

  if (!res.ok) throw new CustomError("fetchWorlds", res);

  const toJson = await res.json();

  if (toJson) return toJson;
  else throw new CustomError("fetchWorlds", "JSON 변환이 잘못됐습니다.");
}
