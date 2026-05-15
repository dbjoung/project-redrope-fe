import { NavLink, Outlet, useParams } from "react-router";
import SideMenu from "@widget/side-menu/ui/SideMenu.tsx";
import { useCallback, useState } from "react";
import cn from "@/share/lib/cn";

import TopbarLayout from "./TopbarLayout";
import type { IconName } from "lucide-react/dynamic";
import ButtonBig from "@/share/ui/ButtonBig";

type WorldMenuType = {
  iconName: IconName;
  text: string;
  to: string;
};

const OUT_WORLD_MENU: WorldMenuType[] = [
  { iconName: "earth", text: "내 세계", to: "/#" },
  { iconName: "handshake", text: "초대 세계", to: "/#" },
  { iconName: "sparkle", text: "내 설정", to: "/#" },
];

export default function OutWorldLayout() {
  const { worldId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width : 768px)").matches;
  });

  const toggleSidebar = useCallback(() => setSidebarOpen((onOff) => !onOff), []);

  return (
    <section className="rd-background-gradient flex h-screen w-screen">
      <TopbarLayout isInWorld={!!worldId} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <SideMenu
        topSection={<p className={cn("text-rd-fs-title-main font-bold")}>홍연의 서</p>}
        firstSectionGroup={
          <ul className="gap-rd-12 flex flex-col">
            {OUT_WORLD_MENU.map((item) => (
              <li>
                <ButtonBig
                  as={NavLink}
                  iconName={item.iconName}
                  text={item.text}
                  size="small"
                  direction="left"
                  elementProps={{ className: "w-full", to: "/#" }}
                />
              </li>
            ))}
          </ul>
        }
        className={cn(
          "sidebarAnimation w-rd-sidebar fixed top-0 z-10",
          sidebarOpen ? "opacity-100" : "sidebarClosed opacity-0",
        )}
      />
      <div
        className={cn(
          "sidebarAnimation bg-rd-white fixed top-0 z-9 h-full shrink-0 md:relative",
          sidebarOpen
            ? "w-rd-sidebar opacity-100"
            : "sidebarClosed w-rd-sidebar opacity-0 md:w-0 md:transform-none",
        )}
      />
      <main className="sidebarAnimation pr-rd-16 pl-rd-16 min-w-0 flex-1 pt-16 md:pr-16 md:pl-16">
        <Outlet />
      </main>
    </section>
  );
}
