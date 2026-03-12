import DynamicSelectedIcon from "@share/DynamicSelectedIcon.tsx";
import type { IconName } from "lucide-react/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@share/lib/cn.ts";
import type { ComponentProps } from "react";

const ButtonBigVariants = cva(
  "relative overflow-clip flex w-fit items-center gap-rd-4 p-rd-16 font-medium text-rd-fs-title-main",
  {
    variants: {
      background: {
        true: "rd-button-gradient text-rd-white",
        false: "bg-none",
      },
      direction: {
        center: "justify-center",
        left: "justify-start",
      },
      rounded: {
        true: "rounded-rd-16",
        false: "rounded-rd-8",
      },
    },
  },
);

interface ButtonBigProps extends VariantProps<typeof ButtonBigVariants> {
  iconName?: IconName;
  buttonProps: ComponentProps<"button">;
}

export default function ButtonBig({
  iconName,
  background = true,
  rounded = true,
  direction = "center",
  buttonProps,
}: ButtonBigProps) {
  return (
    <button
      {...buttonProps}
      className={cn(
        ButtonBigVariants({ background, rounded, direction }),
        buttonProps.className,
        "group cursor-pointer",
      )}
    >
      <div className="bg-rd-black absolute top-0 right-0 h-full w-full opacity-0 group-hover:opacity-20"></div>
      {iconName && (
        <DynamicSelectedIcon name={iconName} customize={{ size: 24, className: "z-1" }} />
      )}
      <p className={"z-1 font-normal"}>{buttonProps.content}</p>
    </button>
  );
}
