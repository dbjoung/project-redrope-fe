import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { cUnauthorizedException } from "@src/auth/exception/auth.exception";
import { AuthPayloadAfterType } from "@src/auth/common/auth.type";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorator/public.decorator";

export type AuthUserType = {
  userId: string;
  email: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractBearerTokenFromHeader(request);
    console.log(request);
    if (!token) throw cUnauthorizedException("토큰이 없습니다.");

    try {
      const payload = await this.jwtService.verifyAsync<AuthPayloadAfterType>(token);
      request["user"] = payload;
    } catch {
      throw cUnauthorizedException("토큰에 문제가 있습니다.");
    }

    return true;
  }

  private extractBearerTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
