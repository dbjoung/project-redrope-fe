import HelperLink from "./HelperLink";

export default {
  component: HelperLink,
  title: "HelperLink",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
};

export const Default = {
  args: {
    label: "처음 방문하셨나요?",
    linkLabel: "회원가입",
    href: "/#",
  },
};
