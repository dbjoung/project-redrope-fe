import { BoxNormal } from "@src/box/entity/box_normal.entity";
import { BoxRope } from "@src/box/entity/box_rope.entity";
import { Category } from "@src/category/entity/category.entity";
import { DeletableEntity } from "@src/common/entity/deleteable.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Node extends DeletableEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column()
  is_template!: boolean;
  @Column()
  type!: "charactor" | "world";
  @Column()
  order!: number;

  @OneToMany(() => BoxNormal, (BoxNormal) => BoxNormal.parentNode)
  normalBoxes!: BoxNormal[];

  @OneToMany(() => BoxRope, (boxRope) => boxRope.parentNode)
  ropeBoxes!: BoxRope[];

  @ManyToOne(() => Category, (cate) => cate.nodes)
  parentCategory!: Category;
}
