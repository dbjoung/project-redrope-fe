import type { ComponentProps } from "react";
import cn from "@share/lib/cn.ts";

type InputBoxProps = ComponentProps<"input">;

export default function InputBox(props: InputBoxProps) {
  return (
    <input
      {...props}
      className={cn(
        "p-rd-16 text-rd-fs-hard rounded-rd-8 border-rd-surface-gray-100 focus:border-rd-surface-red-200 border-2 focus:outline-none",
        props.className,
      )}
    />
  );
}
