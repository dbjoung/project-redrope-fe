import { NavLink } from "react-router";
import ButtonIcon from "@share/ui/ButtonIcon.tsx";

type EntityCardProps = {
  id: number;
  worldId: number;
  categoryId: number;
  entityId: number;
  title: string;
  imageUrl: string;
  writer: string;
  description: string;
};

export default function EntityCard({
  worldId,
  categoryId,
  entityId,
  title,
  imageUrl,
  writer,
  description,
}: EntityCardProps) {
  return (
    <NavLink to={`/worlds/${worldId}/${categoryId}/${entityId}`} className="block w-full">
      <section className="rd-box-shadow rounded-rd-16 bg-rd-white relative flex w-full flex-col overflow-hidden border-white">
        <section className="h-42.5">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </section>
        <section className="gap-rd-8 p-rd-24 flex h-30 flex-col">
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
