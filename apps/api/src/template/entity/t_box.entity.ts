import { BaseEntity } from "@src/common/entity/base.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Template } from "./template.entity";
import { TemplateType } from "../common/template.type";

export class TemplateBox extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column()
  description!: string;
  @Column()
  order!: number;
  @Column({
    type: "enum",
    enum: TemplateType,
  })
  type!: TemplateType;

  @ManyToOne(() => Template, (temp) => temp.boxes)
  parentTemplate!: Template;
}
