import ButtonBig from "@share/ui/ButtonBig.tsx";
import { NavLink } from "react-router";

export default function OptionMenuList() {
  return (
    <ul className="gap-rd-12 flex flex-col">
      <li>
        <ButtonBig
          as={NavLink}
          iconName={"earth"}
          text={"인연 지도"}
          size="small"
          direction="left"
          elementProps={{ className: "w-full", to: "/#" }}
        />
      </li>
      <li>
        <ButtonBig
          as={NavLink}
          iconName={"earth"}
          text={"세계 설정"}
          size="small"
          direction="left"
          elementProps={{ className: "w-full", to: "/#" }}
        />
      </li>
    </ul>
  );
}
