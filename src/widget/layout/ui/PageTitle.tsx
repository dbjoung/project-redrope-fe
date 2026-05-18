import type { ReactNode, ReactElement } from "react";
import DynamicSelectedIcon from "@share/ui/DynamicSelectedIcon.tsx";

type PageTitleProps = {
  title: string;
  iconName?: string;
  description?: string;
  rightArea?: ReactElement;
  children?: ReactNode;
};

export default function PageTitle({
  title,
  iconName = "earth",
  description,
  rightArea,
  children,
}: PageTitleProps) {
  return (
    <section className="gap-rd-32 flex flex-col">
      <section className="gap-rd-16 flex w-full flex-col justify-between md:flex-row">
        <div className="gap-rd-12 flex flex-col">
          <div className="gap-rd-16 flex items-center">
            <DynamicSelectedIcon name={iconName} customize={{ size: 32 }} />
            <h1 className="text-rd-fs-head font-bold">{title}</h1>
          </div>
          <p className="text-rd-fs-title-sub font-normal">{description}</p>
        </div>
        {rightArea}
      </section>
      <section>{children}</section>
    </section>
  );
}
