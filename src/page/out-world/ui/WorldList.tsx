import PageTitle from "@widget/layout/ui/PageTitle.tsx";
import ButtonBig from "@/share/ui/ButtonBig";
import WorldCard from "@feature/world/ui/WorldCard";
import { useQuery } from "@tanstack/react-query";
import { type ApiRequest } from "@/share/lib/unWrap";
import { fetchWorldList, type WorldCardType } from "../api/fetchWorldList";
import { useClient } from "@/share/model/useClient";
import CardUL from "@/share/ui/CardUL";

export default function WorldList() {
  const client = useClient<ApiRequest<WorldCardType[]>>();
  const { data: worldList, isPending } = useQuery({
    queryKey: [client],
    queryFn: async () => fetchWorldList(client),
    throwOnError: true,
  });

  if (isPending || !worldList) {
    return <p className="text-rd-fs-normal text-rd-surface-gray-400">불러오는 중...</p>;
  }

  return (
    <PageTitle
      title={"내 세계"}
      description={"세계를 만들어 관리해보세요."}
      rightArea={
        <ButtonBig
          as={"button"}
          iconName={"plus"}
          text={"세계 추가"}
          size="large"
          background
          direction="center"
          elementProps={{ className: "w-fit" }}
        />
      }
    >
      <CardUL>
        {worldList.map((world) => (
          <WorldCard
            key={world.id}
            id={world.id}
            title={world.title}
            description={world.description}
            imageUrl={world.imageUrl}
            writer={world.writer}
          />
        ))}
      </CardUL>
    </PageTitle>
  );
}
