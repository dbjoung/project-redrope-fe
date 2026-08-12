import { BaseEntity } from "@src/common/entity/base.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateBox } from "./t_box.entity";

export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;

  @OneToMany(() => TemplateBox, (tb) => tb.parentTemplate)
  boxes!: TemplateBox[];
}
