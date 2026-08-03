import { HttpException } from "@nestjs/common";

export class CustomException extends HttpException {
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message, status);
    this.code = code;
  }
}
