import DynamicSelectedIcon from "@share/ui/DynamicSelectedIcon.tsx";
import type { IconName } from "lucide-react/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@share/lib/cn.ts";
import type { ComponentPropsWithRef, ElementType } from "react";
import Polymorphic from "@share/ui/Polymorphic.tsx";

const ButtonBigVariants = cva(
  "text-rd-fs-title-sub p-rd-16 relative overflow-clip flex w-fit items-center gap-rd-12",
  {
    variants: {
      background: {
        true: "rd-button-gradient text-rd-white rd-button-shadow",
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
      size: {
        small: "font-light",
        large: "font-medium",
      },
    },
  },
);

type ButtonBigProps<T extends ElementType = "button"> = {
  as?: T;
  iconName?: IconName;
  text: string;
  elementProps: ComponentPropsWithRef<T>;
} & VariantProps<typeof ButtonBigVariants>;

export default function ButtonBig<T extends ElementType = "button">({
  as,
  iconName,
  text,
  background = false,
  rounded = false,
  direction = "center",
  size = "large",
  elementProps,
}: ButtonBigProps<T>) {
  return (
    <Polymorphic
      as={as}
      {...elementProps}
      className={cn(
        ButtonBigVariants({ background, rounded, direction, size }),
        elementProps?.className,
        "group cursor-pointer",
      )}
    >
      <div className="bg-rd-black absolute top-0 right-0 h-full w-full opacity-0 group-hover:opacity-20"></div>
      {iconName && (
        <DynamicSelectedIcon name={iconName} customize={{ size: 24, className: "z-1" }} />
      )}
      <p className={"z-1"}>{text}</p>
    </Polymorphic>
  );
}
