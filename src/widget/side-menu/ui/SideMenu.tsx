import ButtonBig from "@share/ui/ButtonBig.tsx";

import { NavLink } from "react-router";
import cn from "@/share/lib/cn";
import { useEffect, type ReactElement } from "react";

export default function SideMenu({
  topSection,
  firstSectionGroup,
  secondSectionGroup,
  className,
}: {
  topSection: ReactElement;
  firstSectionGroup: ReactElement;
  secondSectionGroup?: ReactElement;
  className?: string;
}) {
  useEffect(() => {});

  return (
    <section className={cn("rd-border-r flex h-full flex-col justify-between", className)}>
      <section className="w-full pt-12">
        <section id="header-section" className={cn("top-section p-rd-16 gap-rd-12 flex flex-col")}>
          {topSection}
        </section>
        <section id="menu-up-section" className={"p-rd-16 rd-border-t flex flex-col"}>
          {firstSectionGroup}
        </section>
        <section id="menu-down-section" className={"p-rd-16 rd-border-t flex flex-col"}>
          {secondSectionGroup}
        </section>
      </section>
      <section id="footer-section" className={"p-rd-16 rd-border-t flex flex-col"}>
        <ButtonBig
          as={NavLink}
          iconName={"arrow-big-left-dash"}
          text={"로그아웃"}
          size="small"
          direction="left"
          elementProps={{ to: "/#", className: "w-full" }}
        />
      </section>
    </section>
  );
}
