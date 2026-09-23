import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Template } from "./entity/template.entity";
import { TemplateBox } from "./entity/t_box.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateBox])],
})
export class TemplateModule {}
