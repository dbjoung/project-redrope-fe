import { DeletableEntity } from "@src/common/entity/deleteable.entity";
import { World } from "@src/world/entity/world.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Category extends DeletableEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  icon_id!: string;

  @Column()
  order!: number;

  @OneToMany(() => Node, (node) => node)
  nodes!: Node[];

  @ManyToOne(() => World, (world) => world.categories)
  parentWorld!: World;
}
