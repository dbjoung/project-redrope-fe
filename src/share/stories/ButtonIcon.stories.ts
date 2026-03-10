import { fn } from "storybook/test";
import ButtonIcon from "@share/ButtonIcon.tsx";

export default {
  component: ButtonIcon,
  title: "ButtonIcon",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: { onClick: fn() },
};

export const Default = {
  args: {
    iconName: "camera",
    fill: true,
    stroke: true,
  },
};
