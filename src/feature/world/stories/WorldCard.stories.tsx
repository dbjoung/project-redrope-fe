import WorldCard from "@feature/world/ui/WorldCard.tsx";

export default {
  component: WorldCard,
  title: "WorldCard",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
};

export const Default = {
  args: {
    title: "매직케인",
    imageUrl: "https://picsum.photos/200/300",
    writer: "dasol",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer t",
  },
};
