import { memo } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { DynamicIcon, type IconName } from "lucide-react/dynamic.mjs";
import type { LucideProps } from "lucide-react";

interface FixedIconProps {
  name: IconName;
  customize?: Omit<LucideProps, "name">;
}

const DynamicSelectedIcon = memo(function FixedIcon({ name, customize }: FixedIconProps) {
  return <DynamicIcon name={name} {...customize} />;
});

DynamicSelectedIcon.displayName = "DynamicSelectedIcon";
export default DynamicSelectedIcon;
