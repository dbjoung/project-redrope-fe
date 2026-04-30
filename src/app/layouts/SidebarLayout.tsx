import { Outlet } from "react-router";
import SideMenu from "@widget/side-menu/ui/SideMenu.tsx";

export default function SidebarLayout() {
  return (
    <section className="rd-background-gradient flex h-screen w-screen">
      <SideMenu />
      <main className="pt-rd-40 pl-rd-24 pr-rd-24 w-full">
        <Outlet />
      </main>
    </section>
  );
}
