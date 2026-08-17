import { ManyToOne } from "typeorm";
import { Box } from "./box.entity";
import { Node } from "@src/node/entity/node.entity";

export class BoxNormal extends Box {
  @ManyToOne(() => Node, (node) => node.normalBoxes)
  parentNode!: Node;
}
