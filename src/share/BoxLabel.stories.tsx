import { fn } from "storybook/test";
import { BoxLabel } from "@share/BoxLabel.tsx";

export default {
  component: BoxLabel,
  title: "BoxLabel",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: { onClick: fn() },
};

export const Default = {
  args: {},
};
