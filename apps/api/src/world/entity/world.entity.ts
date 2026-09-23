import { Category } from "@src/category/entity/category.entity";
import { DeletableEntity } from "@src/common/entity/deleteable.entity";
import { Resource } from "@src/resource/entity/resource.entity";
import { UserWorld } from "@src/world/entity/user_world.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class World extends DeletableEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ unique: true })
  slug!: string;

  @OneToOne(() => Resource, { nullable: true })
  @JoinColumn()
  representImg!: Resource | null;

  @OneToMany(() => Category, (cate) => cate.parentWorld, {
    onDelete: "CASCADE",
  })
  categories!: Category[];

  @OneToMany(() => UserWorld, (uw) => uw.world)
  userWorlds!: UserWorld[];
}
