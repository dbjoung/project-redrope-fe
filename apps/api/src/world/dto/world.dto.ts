import { WorldRole } from "../common/world.role";

export type WorldSummaryWithRole = {
  id: number;
  title: string;
  description: string;
  role: WorldRole;
};
