import DynamicSelectedIcon from "@share/DynamicSelectedIcon.tsx";
import type { IconName } from "lucide-react/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@share/util/cn.ts";

const ButtonType1Variants = cva(
  "flex w-fit items-center gap-4 p-rd-16 text-lg font-medium text-rd-fs-title-main",
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
}

export default function ButtonType1({
  iconName,
  className,
  content = "",
  background = true,
  rounded = true,
  direction = "center",
}: ButtonType1Props) {
  return (
    <button className={cn(ButtonType1Variants({ background, rounded, direction }), className)}>
      <DynamicSelectedIcon name={iconName} customize={{ size: 24 }} />
      <p>{content}</p>
    </button>
  );
}
