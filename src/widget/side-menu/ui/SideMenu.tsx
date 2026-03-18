import ButtonIcon from "@share/ui/ButtonIcon.tsx";
import ButtonBig from "@share/ui/ButtonBig.tsx";
import MainMenuList from "@feature/menu/ui/MainMenuList.tsx";
import OptionMenuList from "@feature/menu/ui/OptionMenuList.tsx";
import ButtonSmall from "@share/ui/ButtonSmall.tsx";
import { NavLink } from "react-router";

export default function SideMenu() {
  return (
    <section className="rd-border-r flex h-full w-[270px] flex-col justify-between">
      <section className="w-full">
        <section id="header-section" className="top-section p-rd-16 gap-rd-12 flex flex-col">
          <div className="flex items-center justify-between">
            <ButtonSmall
              iconName={"earth"}
              padded
              rounded
              color={"gray"}
              buttonProps={{ content: "돌아가기" }}
            />
            <ButtonIcon iconName="columns-2" stroke={false} fill={false} onClick={() => {}} />
          </div>
          <p className="text-rd-fs-title-main font-bold">홍연의 서</p>
        </section>
        <section id="menu-up-section" className={"p-rd-16 rd-border-t flex flex-col"}>
          <MainMenuList />
        </section>
        <section id="menu-down-section" className={"p-rd-16 rd-border-t flex flex-col"}>
          <OptionMenuList />
        </section>
      </section>
      <section id="footer-section" className={"p-rd-16 rd-border-t flex flex-col"}>
        <ButtonBig
          as={NavLink}
          iconName={"earth"}
          text={"로그아웃"}
          size="small"
          direction="left"
          elementProps={{ to: "/#", className: "w-full" }}
        />
      </section>
    </section>
  );
}
