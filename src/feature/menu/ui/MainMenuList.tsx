import ButtonBig from "@share/ui/ButtonBig.tsx";
import { NavLink } from "react-router";

export default function MainMenuList() {
  return (
    <ul className="gap-rd-12 flex flex-col">
      <li>
        <ButtonBig
          as={NavLink}
          iconName={"earth"}
          text={"세계"}
          size="small"
          direction="left"
          elementProps={{ className: "w-full", to: "/#" }}
        />
      </li>
      <li>
        <ButtonBig
          as={NavLink}
          iconName={"earth"}
          text={"내 설정"}
          size="small"
          direction="left"
          elementProps={{ className: "w-full", to: "/#" }}
        />
      </li>
    </ul>
  );
}
