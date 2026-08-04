import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../../.env"],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>("MYSQL_HOST") ?? "localhost";
        const port = Number(configService.get<string>("MYSQL_PORT") ?? "3307");
        const username = configService.get<string>("MYSQL_USER");
        const password = configService.get<string>("MYSQL_ROOT_PASSWORD");
        const database = configService.get<string>("MYSQL_DATABASE");

        return {
          type: "mysql" as const,
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    UserModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
