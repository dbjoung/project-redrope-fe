import ButtonBig from "@share/ui/ButtonBig.tsx";
import { fn } from "storybook/test";

export default {
  component: ButtonBig,
  title: "ButtonBig",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: { onClick: fn() },
};

export const Default = {
  args: {
    iconName: "camera",
    background: true,
    rounded: true,
    direction: "left",
    buttonProps: { type: "submit", content: "로그인", className: "w-full" },
  },
};
