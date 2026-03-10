import cn from "@share/lib/cn.ts";
import DynamicSelectedIcon, { type FixedIconProps } from "@share/DynamicSelectedIcon.tsx";
import type { ReactNode } from "react";

export type BoxLabelProps = {
  textVariant?: "regular" | "medium" | "bold";
  text: string;
  htmlFor: string;
  required?: boolean;
  iconInfo?: FixedIconProps;
  children?: ReactNode;
};

const textVariants = {
  regular: "text-rd-fs-hard",
  medium: "text-rd-fs-title-sub",
  bold: "text-rd-fs-title-sub font-bold",
};

export function BoxLabel({
  textVariant = "regular",
  text,
  htmlFor,
  required = false,
  iconInfo,
  children,
}: BoxLabelProps) {
  return (
    <div className={cn("flex items-center justify-between")}>
      <div className="gap-rd-8 flex items-center">
        {iconInfo && <DynamicSelectedIcon {...iconInfo} />}
        <div className="flex">
          <label className={cn("font-regular", textVariants[textVariant])} htmlFor={htmlFor}>
            {text}
          </label>
          <DynamicSelectedIcon
            name={"asterisk"}
            customize={{
              size: 12,
              color: "red",
              className: required ? "" : "hidden",
            }}
          />
        </div>
      </div>
      {children && <div className="gap-rd-16 flex">{children}</div>}
    </div>
  );
}
