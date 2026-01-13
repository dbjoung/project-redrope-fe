import ButtonBig from "@share/ButtonBig.tsx";
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
    content: "로그인",
    background: true,
    rounded: true,
    className: "w-full",
    direction: "left",
  },
};
