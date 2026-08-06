import { cva, type VariantProps } from "class-variance-authority";
import DynamicSelectedIcon from "./DynamicSelectedIcon";

const BoxVariants = cva("rounded-rd-8  px-rd-16 py-rd-16 flex items-center gap-2.5", {
  variants: {
    type: {
      warn: "bg-rd-surface-red-100 text-rd-title-red",
      info: "bg-rd-surface-blue-100 text-rd-title-blue",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export interface InfoBoxType extends VariantProps<typeof BoxVariants> {
  infoText: string;
}

export function InfoBox({ type, infoText }: InfoBoxType) {
  return (
    <section className={BoxVariants({ type })}>
      <DynamicSelectedIcon name={"circle-alert"} customize={{ size: 18, className: "z-1" }} />
      <p className="text-rd-fs-hard font-semibold">{infoText}</p>
    </section>
  );
}
