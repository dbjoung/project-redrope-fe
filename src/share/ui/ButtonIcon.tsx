import DynamicSelectedIcon from "@share/ui/DynamicSelectedIcon.tsx";
import type { IconName } from "lucide-react/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@share/lib/cn.ts";

const ButtonIconVariants = cva(
  "rounded-rd-24 text-rd-surface-gray-300 relative p-rd-12 overflow-clip flex w-fit justify-center items-center cursor-pointer",
  {
    variants: {
      fill: {
        true: "bg-rd-surface-red-100 text-rd-surface-red-300",
        false: "bg-none",
      },
      stroke: {
        true: "border-rd-surface-red-400 border text-rd-surface-red-400 hover:bg-rd-surface-red-100",
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
        className,
        "hover:text-rd-surface-red-400",
      )}
      onClick={onClick}
    >
      <DynamicSelectedIcon name={iconName} customize={{ size: 24, className: "z-1" }} />
    </button>
  );
}
