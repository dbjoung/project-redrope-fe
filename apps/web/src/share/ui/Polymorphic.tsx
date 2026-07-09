import type { ElementType, ComponentPropsWithRef } from "react";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithRef<T>;

export default function Polymorphic<T extends ElementType = "div">({
  as,
  ...props
}: PolymorphicProps<T>) {
  const Element = as || "div";
  return <Element {...props} />;
}
