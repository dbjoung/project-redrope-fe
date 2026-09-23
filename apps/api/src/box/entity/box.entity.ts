import { BaseEntity } from "@src/common/entity/base.entity";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Box extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;
  @Column()
  description!: string;
  @Column()
  order!: number;
  @Column()
  isTemplate!: boolean;
}
