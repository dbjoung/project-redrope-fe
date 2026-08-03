import { DeleteDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

export abstract class DeletableEntity extends BaseEntity {
  @DeleteDateColumn({ name: "delete_date", nullable: true, default: null })
  deleteDate!: Date | null;
}
