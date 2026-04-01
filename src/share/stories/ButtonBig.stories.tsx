import ButtonBig from "@share/ui/ButtonBig.tsx";
import { NavLink } from "react-router";
import { fn } from "storybook/test";

export default {
  component: ButtonBig,
  title: "ButtonBig",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
};

export const Default = {
  args: {
    as: "button",
    iconName: "camera",
    text: "로그인",
    background: true,
    rounded: true,
    direction: "left",
    size: "large",
    elementProps: {
      onClick: fn(),
    },
  },
};

export const LinkButton = {
  args: {
    as: NavLink,
    iconName: "camera",
    text: "로그인",
    background: true,
    rounded: true,
    direction: "left",
    size: "large",
    elementProps: {
      to: "/#",
    },
  },
};
