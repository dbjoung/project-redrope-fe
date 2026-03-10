import cn from "@share/lib/cn.ts";
import type { ReactNode } from "react";

export default function ContentsContainer({ children }: { children: ReactNode }) {
  return <section className={cn("gap-rd-4 flex flex-col")}>{children}</section>;
}
