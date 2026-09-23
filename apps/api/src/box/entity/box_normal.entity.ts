import { Entity, ManyToOne } from "typeorm";
import { Box } from "./box.entity";
import { Node } from "@src/node/entity/node.entity";

@Entity()
export class BoxNormal extends Box {
  @ManyToOne(() => Node, (node) => node.normalBoxes)
  parentNode!: Node;
}
