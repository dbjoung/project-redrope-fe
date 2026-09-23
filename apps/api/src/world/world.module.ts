import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { World } from "./entity/world.entity";
import { UserWorld } from "./entity/user_world.entity";
import { WorldController } from "./controller/world.controller";
import { WorldService } from "./service/world.service";

@Module({
  imports: [TypeOrmModule.forFeature([World, UserWorld])],
  controllers: [WorldController],
  providers: [WorldService],
})
export class WorldModule {}
