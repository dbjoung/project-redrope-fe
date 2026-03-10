import { BoxLabel } from "@share/BoxLabel.tsx";

export default {
  component: BoxLabel,
  title: "BoxLabel",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
};

export const Default = {
  args: {
    textVariant: "bold",
    text: "한마디",
    htmlFor: "hanmadi",
    required: false,
    iconInfo: {
      name: "camera",
      customize: {
        size: 24,
      },
    },
  },
};
