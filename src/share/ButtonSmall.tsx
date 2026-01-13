import DynamicSelectedIcon from "@share/DynamicSelectedIcon.tsx";
import type { IconName } from "lucide-react/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@share/util/cn.ts";

const ButtonSmallVariants = cva(
  "border-box text-rd-surface-red-400 relative overflow-clip flex w-fit justify-center items-center gap-rd-8 pl-rd-16 pr-rd-16 font-bold text-rd-fs-hard",
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
      rounded: {
        true: "rounded-rd-16",
        false: "rounded-rd-8",
      },
      padded: {
        true: "pt-rd-8 pb-rd-8",
        false: "pt-rd-4 pb-rd-4 flex-row-reverse",
      },
    },
  },
);

interface ButtonSmallProps extends VariantProps<typeof ButtonSmallVariants> {
  iconName: IconName;
  className?: string;
  content?: string;
  onClick: () => void;
}

export default function ButtonSmall({
  iconName,
  className,
  content = "",
  fill = true,
  stroke = true,
  rounded = true,
  padded = true,
  onClick,
}: ButtonSmallProps) {
  return (
    <button
      className={cn(ButtonSmallVariants({ fill, stroke, rounded, padded }), className, "group")}
      onClick={onClick}
    >
      <div className="bg-rd-black absolute top-0 right-0 h-full w-full opacity-0 group-hover:opacity-10"></div>
      <DynamicSelectedIcon name={iconName} customize={{ size: 18, className: "z-1" }} />
      <p className={"z-1"}>{content}</p>
    </button>
  );
}
