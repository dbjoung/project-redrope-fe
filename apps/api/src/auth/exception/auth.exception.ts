import { UnauthorizedException } from "@nestjs/common";

export const cUnauthorizedException = (message: string) => {
  return new UnauthorizedException(message);
};
