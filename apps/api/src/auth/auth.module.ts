import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { UserModule } from "@src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@src/common/guard/auth-guard";
import { RedisModule } from "@src/redis/redis.module";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_ACCESS_SECRET"),
        signOptions: { expiresIn: configService.get("JWT_ACCESS_EXPIRES_IN") },
      }),
    }),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
