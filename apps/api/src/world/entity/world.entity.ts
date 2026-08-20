import { Category } from "@src/category/entity/category.entity";
import { DeletableEntity } from "@src/common/entity/deleteable.entity";
import { UserWorld } from "@src/world/entity/user_world.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class World extends DeletableEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @OneToMany(() => Category, (cate) => cate.parentWorld, {
    onDelete: "CASCADE",
  })
  categories!: Category[];

  @OneToMany(() => UserWorld, (uw) => uw.world)
  userWorlds!: UserWorld[];
}
