import { ManyToOne, OneToMany } from "typeorm";
import { Box } from "./box.entity";
import { Rope } from "@src/rope/entity/rope.entity";
import { Node } from "@src/node/entity/node.entity";

export class BoxRope extends Box {
  @OneToMany(() => Rope, (rope) => rope.parentBox)
  ropes!: Rope[];

  @ManyToOne(() => Node, (node) => node.ropeBoxes)
  parentNode!: Node;
}
