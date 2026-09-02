import { DeletableEntity } from "@src/common/entity/deleteable.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ResourceType } from "../common/resource.enum";

@Entity()
export class Resource extends DeletableEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  s3Key!: string;
  @Column()
  order!: number;
  @Column({ type: "enum", enum: ResourceType })
  type!: ResourceType;
  @Column()
  isRepresent!: boolean;
}
