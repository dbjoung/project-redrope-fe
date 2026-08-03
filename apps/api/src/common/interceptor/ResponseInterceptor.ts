import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ResponseDto } from "../dto/ResponseDto";
import { map, Observable } from "rxjs";
import ResponseMessage from "../dto/response-message.dto";
import type { Response } from "express";

type ResponseDtoType<T> = ResponseDto<T> | ResponseDto<Omit<T, "message">>;

const DEFAULT_MESSAGE = "응답에 성공했습니다.";

function hasResponseMessage(data: unknown): data is ResponseMessage {
  return data instanceof ResponseMessage;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseDtoType<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseDtoType<T>> | Promise<Observable<ResponseDtoType<T>>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        if (hasResponseMessage(data)) {
          const { message, ...dataWithoutMessage } = data;

          return new ResponseDto(
            dataWithoutMessage,
            message ?? DEFAULT_MESSAGE,
            response.statusCode,
          );
        } else return new ResponseDto(data, DEFAULT_MESSAGE, response.statusCode);
      }),
    );
  }
}
