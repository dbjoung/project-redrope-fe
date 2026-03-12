import cn from "@share/lib/cn.ts";
import DynamicSelectedIcon, { type FixedIconProps } from "@share/DynamicSelectedIcon.tsx";
import type { ComponentProps, ReactNode } from "react";

export type LabelBoxProps = {
  textVariant?: "regular" | "medium" | "bold";
  text: string;
  required?: boolean;
  iconInfo?: FixedIconProps;
  children?: ReactNode;
  labelProps: ComponentProps<"label">;
};

const textVariants = {
  regular: "text-rd-fs-hard",
  medium: "text-rd-fs-title-sub",
  bold: "text-rd-fs-title-sub font-bold",
};

export function LabelBox({
  textVariant = "regular",
  text,
  required = false,
  iconInfo,
  children,
  labelProps,
}: LabelBoxProps) {
  return (
    <div className={cn("flex w-full items-center justify-between")}>
      <div className="gap-rd-8 flex items-center">
        {iconInfo && <DynamicSelectedIcon {...iconInfo} />}
        <div className="flex">
          <label {...labelProps} className={cn("font-regular", textVariants[textVariant])}>
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
