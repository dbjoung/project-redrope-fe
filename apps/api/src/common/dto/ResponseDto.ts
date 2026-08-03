import { ApiResponse } from "@redrope/shared";

export class ResponseDto<T> implements ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(data: T, message: string);
  constructor(data: T, message: string, statusCode: number);

  constructor(data: T, message: string, statusCode?: number) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode ?? 200;
  }
}
