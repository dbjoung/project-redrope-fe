import { DeletableEntity } from "@src/common/entity/deleteable.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource extends DeletableEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  s3Key!: string;
  @Column()
  order!: number;
  @Column()
  type!: "img";
  @Column()
  isRepresent!: boolean;
}
