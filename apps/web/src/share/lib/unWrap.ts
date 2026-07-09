import { CustomError } from "./CustomError";

export type ApiRequest<T> = {
  errorCode: number;
  message: string;
  data: T;
};

export function unWarp<T>(res: ApiRequest<T>) {
  if (res.data) return res.data;
  else throw new CustomError("unWarp", "Res요청에 포함된 data가 없습니다.");
}
