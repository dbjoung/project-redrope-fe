import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Box } from "./entity/box.entity";
import { BoxRope } from "./entity/box_rope.entity";
import { BoxNormal } from "./entity/box_normal.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Box, BoxRope, BoxNormal])],
})
export class BoxModule {}
