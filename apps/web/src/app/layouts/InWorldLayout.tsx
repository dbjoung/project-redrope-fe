import { NavLink, Outlet, useParams } from "react-router";
import SideMenu from "@widget/side-menu/ui/SideMenu.tsx";
import { useCallback, useEffect, useState } from "react";
import cn from "@/share/lib/cn";

import TopbarLayout from "./TopbarLayout";
import type { IconName } from "lucide-react/dynamic";
import ButtonBig from "@/share/ui/ButtonBig";
import { useQuery } from "@tanstack/react-query";
import { fetchWorldInfo } from "@/page/out-world/api/fetchWorldInfo";
import { useClient } from "@/share/model/useClient";
import type { ApiRequest } from "@/share/lib/unWrap";
import type { WorldInfoType } from "@/share/model/useWorldInfoStore";
import { USABLE_ICON, type UsableIconKey } from "@/share/constants/const";

type WorldMenuType = {
  iconName: IconName;
  text: string;
  to: string;
};

const IN_WORLD_MENU: WorldMenuType[] = [
  { iconName: "waypoints", text: "인연 지도", to: "/#" },
  { iconName: "earth", text: "세계 설정", to: "/#" },
];

export default function InWorldLayout() {
  const client = useClient<ApiRequest<WorldInfoType>>();
  const { worldId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width : 768px)").matches;
  });

  const { data: worldInfo, isPending } = useQuery({
    queryKey: [client, worldId],
    queryFn: async () => fetchWorldInfo(client, worldId),
    throwOnError: true,
  });

  const toggleSidebar = useCallback(() => setSidebarOpen((onOff) => !onOff), []);

  useEffect(() => {}, []);

  if (isPending || !worldInfo) {
    return <p className="text-rd-fs-normal text-rd-surface-gray-400">불러오는 중...</p>;
  }

  return (
    <section className="rd-background-gradient flex h-screen w-screen">
      <TopbarLayout isInWorld={!!worldId} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <SideMenu
        topSection={
          <>
            <p className="text-rd-fs-title-main font-bold">{worldInfo.title}</p>
            <p className="text-rd-surface-gray-500 text-rd-fs-caption font-medium">
              엮은이 | {worldInfo.writer}
            </p>
          </>
        }
        firstSectionGroup={
          <ul className="gap-rd-12 flex flex-col">
            {worldInfo.categories.map((category) => (
              <li>
                <ButtonBig
                  as={NavLink}
                  iconName={USABLE_ICON[category.iconId as UsableIconKey]}
                  text={category.name}
                  size="small"
                  direction="left"
                  elementProps={{ className: "w-full", to: `/worlds/${worldId}/${category.id}` }}
                />
              </li>
            ))}
          </ul>
        }
        secondSectionGroup={
          <ul className="gap-rd-12 flex flex-col">
            {IN_WORLD_MENU.map((item) => (
              <li>
                <ButtonBig
                  as={NavLink}
                  iconName={item.iconName}
                  text={item.text}
                  size="small"
                  direction="left"
                  elementProps={{ className: "w-full", to: "/" }}
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
