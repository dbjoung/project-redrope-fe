import { CustomError } from "./CustomError";
import type { ApiResponse } from "@redrope/shared";

export function unWarp<T>(res: ApiResponse<T>) {
  if (res.data) return res.data;
  else throw new CustomError("unWarp", "Res요청에 포함된 data가 없습니다.");
}
