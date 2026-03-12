import cn from "@share/lib/cn.ts";
import type { ReactNode } from "react";

const roundVariants = {
  none: "rounded-none",
  small: "rounded-rd-8",
  medium: "rounded-rd-16",
  large: "rounded-rd-24",
};

export default function FlexColContainer({
  className,
  round = "none",
  children,
}: {
  className?: string;
  round?: "none" | "small" | "medium" | "large";
  children: ReactNode;
}) {
  return (
    <section className={cn("flex w-full flex-col", roundVariants[round], className)}>
      {children}
    </section>
  );
}
