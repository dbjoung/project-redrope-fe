import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Node } from "./entity/node.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Node])],
})
export class NodeModule {}
