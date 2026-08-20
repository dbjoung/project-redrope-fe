import { BoxRope } from "@src/box/entity/box_rope.entity";
import { BaseEntity } from "@src/common/entity/base.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rope extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  title!: string;
  @Column()
  description!: string;
  @Column()
  level!: number;

  node1!: Node | null;

  node2!: Node | null;

  @Column()
  type!: "one-way" | "two-way";

  @ManyToOne(() => BoxRope, (boxRope) => boxRope.ropes)
  parentBox!: BoxRope;
}
