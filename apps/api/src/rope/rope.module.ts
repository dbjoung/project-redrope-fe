import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rope } from "./entity/rope.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Rope])],
})
export class RopeModule {}
