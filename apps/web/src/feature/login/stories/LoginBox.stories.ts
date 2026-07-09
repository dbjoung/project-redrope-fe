import LoginBox from "@feature/login/ui/LoginBox.tsx";

export default {
  component: LoginBox,
  title: "LoginBox",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
};

export const Default = {
  args: {
    text: "아이디",
    htmlFor: "id",
    placeholder: "아이디를 입력해주세요.",
    required: true,
  },
};
