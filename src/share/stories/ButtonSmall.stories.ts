import { fn } from "storybook/test";
import ButtonSmall from "@share/ui/ButtonSmall.tsx";

export default {
  component: ButtonSmall,
  title: "ButtonSmall",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: { onClick: fn() },
};

export const Default = {
  args: {
    iconName: "camera",
    buttonProps: { type: "submit", content: "로그인", className: "w-full" },
  },
};
