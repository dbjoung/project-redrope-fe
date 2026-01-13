import DynamicSelectedIcon from "@share/DynamicSelectedIcon.tsx";
import type { IconName } from "lucide-react/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@share/util/cn.ts";

const ButtonType1Variants = cva(
  "relative overflow-clip flex w-fit items-center gap-4 p-rd-16 font-medium text-rd-fs-title-main",
  {
    variants: {
      background: {
        true: "bg-rd-title-red text-rd-white",
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

interface ButtonType1Props extends VariantProps<typeof ButtonType1Variants> {
  iconName: IconName;
  className?: string;
  content?: string;
  onClick: () => void;
}

export default function ButtonBig({
  iconName,
  className,
  content = "",
  background = true,
  rounded = true,
  direction = "center",
  onClick,
}: ButtonType1Props) {
  return (
    <button
      className={cn(ButtonType1Variants({ background, rounded, direction }), className, "group")}
      onClick={onClick}
    >
      <div className="bg-rd-black absolute top-0 right-0 h-full w-full opacity-0 group-hover:opacity-20"></div>
      <DynamicSelectedIcon name={iconName} customize={{ size: 24, className: "z-1" }} />
      <p className={"z-1"}>{content}</p>
    </button>
  );
}
