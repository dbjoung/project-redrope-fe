import DynamicSelectedIcon from "@share/ui/DynamicSelectedIcon.tsx";
import cn from "@share/lib/cn.ts";

type ButtonBoxIcon = {
  iconName: string;
  className?: string;
  onClick?: () => void;
};

export default function ButtonBoxIcon({ iconName, className, onClick }: ButtonBoxIcon) {
  return (
    <button
      className={cn(
        "rounded-rd-24 text-rd-black relative flex w-fit cursor-pointer items-center justify-center",
        className,
        "hover:text-rd-surface-red-400",
      )}
      onClick={onClick}
    >
      <DynamicSelectedIcon
        name={iconName}
        customize={{ size: 24, className: "z-1", strokeWidth: 2 }}
      />
    </button>
  );
}
