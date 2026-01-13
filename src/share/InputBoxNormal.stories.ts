import InputBoxNormal from "@share/InputBoxNormal.tsx";

export default {
  component: InputBoxNormal,
  title: "InputBoxNormal",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
};

export const Default = {
  args: {
    label: "아이디",
    placeholder: "아이디를 입력해주세요.",
    required: true,
  },
};
