import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeletableEntity } from "@src/common/entity/deleteable.entity";
import { UserWorld } from "@src/world/entity/user_world.entity";

@Entity()
export class User extends DeletableEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nickname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => UserWorld, (uw) => uw.user, {
    onDelete: "CASCADE",
  })
  userWorlds!: UserWorld[];
}
