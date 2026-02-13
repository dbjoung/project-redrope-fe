import cn from "@share/util/cn.ts";
import DynamicSelectedIcon from "@share/DynamicSelectedIcon.tsx";

export type BoxLabelProps = {
  text: string;
  htmlFor: string;
  required?: boolean;
};

export function BoxLabel({ text, htmlFor, required = false }: BoxLabelProps) {
  return (
    <div className={cn("gap-rd-4 flex")}>
      <label className="text-rd-fs-hard font-regular" htmlFor={htmlFor}>
        {text}
      </label>
      <DynamicSelectedIcon
        name={"asterisk"}
        customize={{ size: 12, color: "red", className: required ? "" : "hidden" }}
      />
    </div>
  );
}
