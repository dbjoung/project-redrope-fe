import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "./redis/redis.module";
import { BoxModule } from "./box/box.module";
import { CategoryModule } from "./category/category.module";
import { NodeModule } from "./node/node.module";
import { RopeModule } from "./rope/rope.module";
import { ResourceModule } from "./resource/resource.module";
import { TemplateModule } from "./template/template.module";
import { WorldModule } from "./world/world.module";

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
    ResourceModule,
    BoxModule,
    CategoryModule,
    NodeModule,
    RopeModule,
    TemplateModule,
    WorldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
