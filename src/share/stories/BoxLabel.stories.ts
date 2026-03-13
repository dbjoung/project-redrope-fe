import { LabelBox } from "@share/ui/LabelBox.tsx";

export default {
  component: LabelBox,
  title: "LabelBox",
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
