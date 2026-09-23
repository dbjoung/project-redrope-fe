import { BaseEntity } from "@src/common/entity/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateBox } from "./t_box.entity";

@Entity()
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;

  @OneToMany(() => TemplateBox, (tb) => tb.parentTemplate)
  boxes!: TemplateBox[];
}
