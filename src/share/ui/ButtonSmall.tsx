import DynamicSelectedIcon from "@share/ui/DynamicSelectedIcon.tsx";
import type { IconName } from "lucide-react/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@share/lib/cn.ts";
import type { ComponentProps } from "react";

const ButtonSmallVariants = cva(
  "border-box relative overflow-clip flex w-fit justify-center items-center gap-rd-8 pl-rd-16 pr-rd-16 font-bold text-rd-fs-hard cursor-pointer",
  {
    variants: {
      fill: {
        true: "",
        false: "bg-transparent",
      },
      stroke: {
        true: "border",
        false: "border-none",
      },
      rounded: {
        true: "rounded-rd-16",
        false: "rounded-rd-8",
      },
      padded: {
        true: "pt-rd-8 pb-rd-8",
        false: "pt-rd-4 pb-rd-4 flex-row-reverse",
      },
      color: {
        red: "text-rd-surface-red-300 hover:text-rd-surface-red-400",
        gray: "text-rd-surface-gray-300 hover:text-rd-surface-red-400",
      },
    },
    compoundVariants: [
      {
        color: "red",
        fill: true,
        className: "bg-rd-surface-red-100",
      },
      {
        color: "gray",
        fill: true,
        className: "bg-rd-surface-gray-100 hover:bg-rd-surface-red-100",
      },
      {
        color: "red",
        stroke: true,
        className: "border-rd-surface-red-300",
      },
      {
        color: "gray",
        stroke: true,
        className: "border-rd-surface-gray-300 hover:border-rd-surface-red-400",
      },
    ],
  },
);

interface ButtonSmallProps extends VariantProps<typeof ButtonSmallVariants> {
  iconName: IconName;
  buttonProps: ComponentProps<"button">;
}

export default function ButtonSmall({
  iconName,
  fill = true,
  stroke = true,
  rounded = true,
  padded = true,
  color = "red",
  buttonProps,
}: ButtonSmallProps) {
  return (
    <button
      className={cn(
        ButtonSmallVariants({ fill, stroke, rounded, padded, color }),
        buttonProps.className,
      )}
      onClick={buttonProps.onClick}
    >
      <DynamicSelectedIcon name={iconName} customize={{ size: 18, className: "z-1" }} />
      <p className={"z-1"}>{buttonProps.content}</p>
    </button>
  );
}
