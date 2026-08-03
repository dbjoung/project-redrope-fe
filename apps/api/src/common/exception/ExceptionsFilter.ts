import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import type { Response } from "express";
import { ResponseDto } from "../dto/ResponseDto";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const httpContext = host.switchToHttp();
    const res = httpContext.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const statusCode = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException ? exception.message : "Internal server error";

    if (!isHttpException) {
      console.error(exception);
    }

    res.status(statusCode).json(new ResponseDto(null, message, statusCode));
  }
}
