export type WorldRoleType = "OWNER" | "MEMBER" | "GUEST";

export type WorldSummaryType = {
  id: number;
  title: string;
  description: string;
  slug: string;
  representImg: string;
  role: WorldRoleType;
};
