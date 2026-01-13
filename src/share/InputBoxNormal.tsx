import cn from "@share/util/cn.ts";
import DynamicSelectedIcon from "@share/DynamicSelectedIcon.tsx";

type InputBoxType = {
  label: string;
  placeholder: string;
  required: boolean;
};

export default function InputBoxNormal({ label, placeholder, required }: InputBoxType) {
  return (
    <section className={cn("gap-rd-4 flex flex-col")}>
      <div className={cn("gap-rd-4 flex")}>
        <label className="text-rd-fs-hard font-regular">{label}</label>
        <DynamicSelectedIcon
          name={"asterisk"}
          customize={{ size: 12, color: "red", className: required ? "" : "hidden" }}
        />
      </div>
      <input
        className="p-rd-24 text-rd-fs-hard rounded-rd-8 border-rd-surface-gray-100 focus:border-rd-surface-red-200 border-2 focus:outline-none"
        placeholder={placeholder}
        required={required}
      />
    </section>
  );
}
