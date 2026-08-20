import { DeletableEntity } from "@src/common/entity/deleteable.entity";
import { Node } from "@src/node/entity/node.entity";
import { World } from "@src/world/entity/world.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
