import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DeletableEntity } from "@src/common/entity/deleteable.entity";

@Entity("users")
export class User extends DeletableEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nickname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
