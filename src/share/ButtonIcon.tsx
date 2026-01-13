import DynamicSelectedIcon from "@share/DynamicSelectedIcon.tsx";
import type { IconName } from "lucide-react/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@share/util/cn.ts";

const ButtonIconVariants = cva(
  "rounded-rd-24 text-rd-surface-red-400 relative p-rd-12 overflow-clip flex w-fit justify-center items-center",
  {
    variants: {
      fill: {
        true: "bg-rd-surface-red-100",
        false: "bg-none",
      },
      stroke: {
        true: "border-rd-surface-red-400 border",
        false: "border-none",
      },
    },
  },
);

interface ButtonIconProps extends VariantProps<typeof ButtonIconVariants> {
  iconName: IconName;
  className?: string;
  onClick: () => void;
}

export default function ButtonIcon({
  iconName,
  className,
  fill = true,
  stroke = true,
  onClick,
}: ButtonIconProps) {
  return (
    <button
      className={cn(
        ButtonIconVariants({ fill, stroke }),
        !fill && !stroke && "text-rd-surface-gray-300",
        className,
        "group",
      )}
      onClick={onClick}
    >
      <div className="bg-rd-black absolute top-0 right-0 h-full w-full opacity-0 group-hover:opacity-10"></div>
      <DynamicSelectedIcon name={iconName} customize={{ size: 24, className: "z-1" }} />
    </button>
  );
}
