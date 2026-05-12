import WorldCard from "@feature/world/ui/WorldCard";
import { useQuery } from "@tanstack/react-query";
import { unWarp } from "@/share/lib/unWrap";
import { fetchWorldList, type WorldCardType } from "../api/fetchWorldList";

export default function WorldList() {
  const { data: worldList, isPending } = useQuery({
    queryKey: ["worlds"],
    queryFn: fetchWorldList,
    throwOnError: true,
  });

  if (isPending || !worldList) {
    return <p className="text-rd-fs-normal text-rd-surface-gray-400">불러오는 중...</p>;
  }

  return (
    <section className="gap-rd-32 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),300px))]">
      {unWarp<WorldCardType[]>(worldList).map((world) => (
        <WorldCard
          key={world.id}
          title={world.title}
          description={world.description}
          imageUrl={world.imageUrl}
          writer={world.writer}
        />
      ))}
    </section>
  );
}
