import { Injectable } from "@nestjs/common";
import { UserService } from "@src/user/service/user.service";
import { cUnauthorizedException } from "../exception/auth.exception";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";
import { AuthPayloadAfterType, AuthPayloadBeforeType, TokensType } from "../common/auth.type";
import { RedisService } from "@src/redis/redis.service";
import { createHash } from "node:crypto";
import { UserType } from "@redrope/shared";
import { Public } from "@src/common/decorator/public.decorator";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  @Public()
  async signIn(email: string, password: string): Promise<TokensType & UserType> {
    const user = await this.userService.findOne({
      email,
    });
    if (user.password !== password) throw cUnauthorizedException("패스워드를 다시 확인해주세요.");

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateAndSaveRefreshToken(payload),
    ]);

    return { accessToken, refreshToken, id: user.id, email: user.email, nickname: user.nickname };
  }

  async generateAccessToken(payload: AuthPayloadBeforeType) {
    return this.jwtService.signAsync(payload);
  }

  async generateAndSaveRefreshToken(payload: AuthPayloadBeforeType) {
    const refToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
      expiresIn:
        this.configService.getOrThrow<JwtSignOptions["expiresIn"]>("JWT_REFRESH_EXPIRES_IN"),
    });
    const hashedToken = this.hashToken(refToken);
    const redisTokenKey = this.getRefreshTokenKey(payload.userId);
    this.redisService.set(
      redisTokenKey,
      hashedToken,
      this.configService.getOrThrow<number>("JWT_REFRESH_TTL_SECONDS"),
    );

    return refToken;
  }

  private hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }

  private getRefreshTokenKey(userId: string): string {
    return `auth:refresh:${userId}`;
  }

  async confirmRefreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<AuthPayloadAfterType>(refreshToken, {
      secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
    });
    const tokenKey = this.getRefreshTokenKey(payload.userId);
    const refreshTokenInRedis = await this.redisService.get(tokenKey);

    if (!refreshTokenInRedis) throw cUnauthorizedException("RefreshToken이 없습니다.");

    if (this.hashToken(refreshToken) !== refreshTokenInRedis)
      throw cUnauthorizedException("RefreshToken이 일치하지 않습니다.");

    const newAccessToken = await this.generateAccessToken({
      userId: payload.userId,
      email: payload.email,
    });

    return { newAccessToken, userId: payload.userId };
  }

  async logout(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<AuthPayloadAfterType>(refreshToken, {
      secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
    });
    const tokenKey = this.getRefreshTokenKey(payload.userId);
    await this.redisService.delete(tokenKey);
  }
}
