import { fn } from "storybook/test";
import ButtonSmall from "@share/ButtonSmall.tsx";

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
    content: "로그인",
    fill: true,
    stroke: true,
    rounded: true,
    padded: true,
  },
};
