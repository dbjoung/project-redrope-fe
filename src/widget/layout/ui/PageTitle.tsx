import type { ReactNode } from "react";
import DynamicSelectedIcon from "@share/ui/DynamicSelectedIcon.tsx";

type PageTitleProps = { title: string; description?: string; children?: ReactNode };

export default function PageTitle({ title, description, children }: PageTitleProps) {
  return (
    <section className="gap-rd-32 flex flex-col">
      <section className="flex w-full justify-between">
        <div className="gap-rd-8 flex flex-col">
          <div className="gap-rd-16 flex items-center">
            <DynamicSelectedIcon name={"earth"} customize={{ size: 32 }} />
            <h1 className="text-rd-fs-head font-bold">{title}</h1>
          </div>
          <p className="text-rd-fs-title-sub font-normal">{description}</p>
        </div>
      </section>
      <section>{children}</section>
    </section>
  );
}
