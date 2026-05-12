import { NavLink } from "react-router";
import ButtonIcon from "@share/ui/ButtonIcon.tsx";

type WorldCardProps = {
  title: string;
  imageUrl: string;
  writer: string;
  description: string;
};

export default function WorldCard({ title, imageUrl, writer, description }: WorldCardProps) {
  return (
    <NavLink to={"/#"} className="block w-full max-w-[300px]">
      <section className="rd-box-shadow rounded-rd-16 bg-rd-white relative flex w-full flex-col overflow-hidden border-white">
        <section className="h-[170px]">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </section>
        <section className="gap-rd-8 p-rd-24 flex h-[120px] flex-col">
          <div className="flex items-end justify-between">
            <h4 className="text-rd-fs-title-sub truncate font-medium">{title}</h4>
            <p className="text-rd-fs-caption font-normal">{writer}</p>
          </div>
          <p className="text-rd-fs-normal line-clamp-3 font-normal">{description}</p>
        </section>
        <ButtonIcon
          iconName={"trash"}
          onClick={() => null}
          className={"top-rd-8 right-rd-8 absolute"}
        />
      </section>
    </NavLink>
  );
}
