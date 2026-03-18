import ButtonBig from "@share/ui/ButtonBig.tsx";

export default function SubjectMenuList() {
  return (
    <ul className="gap-rd-12 flex flex-col">
      <li>
        <ButtonBig
          as={"NavLink"}
          iconName={"earth"}
          text={"캐릭터"}
          size="small"
          direction="left"
          elementProps={{ className: "w-full" }}
        />
      </li>
      <li>
        <ButtonBig
          as={"NavLink"}
          iconName={"earth"}
          text={"공간"}
          size="small"
          direction="left"
          elementProps={{ className: "w-full" }}
        />
      </li>
    </ul>
  );
}
