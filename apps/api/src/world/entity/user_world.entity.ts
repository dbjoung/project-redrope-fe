import { User } from "@src/user/entities/user.entity";
import { WorldRole } from "@src/world/common/world.role";
import { World } from "@src/world/entity/world.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["user", "world"])
export class UserWorld extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.userWorlds, {
    onDelete: "CASCADE",
  })
  user!: User;

  @ManyToOne(() => World, (world) => world.userWorlds, {
    onDelete: "CASCADE",
  })
  world!: World;

  @Column({
    type: "enum",
    enum: WorldRole,
  })
  role!: WorldRole;
}
