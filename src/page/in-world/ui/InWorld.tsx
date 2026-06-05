import EntityCard from "@/feature/world/ui/EntityCard";
import { fetchCategoryInfo, type CategoryInfoType } from "@/page/out-world/api/fetchCategoryInfo";
import { USABLE_ICON, type UsableIconKey } from "@/share/constants/const";
import { CustomError } from "@/share/lib/CustomError";
import type { ApiRequest } from "@/share/lib/unWrap";
import { useClient } from "@/share/model/useClient";
import ButtonBig from "@/share/ui/ButtonBig";
import PageTitle from "@/widget/layout/ui/PageTitle";
import CardUL from "@/share/ui/CardUL";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function InWorld() {
  const { worldId, categoryId } = useParams();
  const client = useClient<ApiRequest<CategoryInfoType>>();

  const { data: categoryInfo, isPending } = useQuery({
    queryKey: [client, worldId, categoryId],
    queryFn: async () => {
      if (!worldId || !categoryId) throw new CustomError("InWorld", "잘못된 경로입니다.");
      return fetchCategoryInfo(client, parseInt(worldId), parseInt(categoryId));
    },

    throwOnError: true,
  });

  if (isPending || !categoryInfo || !worldId || !categoryId) {
    return <p className="text-rd-fs-normal text-rd-surface-gray-400">불러오는 중...</p>;
  }

  return (
    <PageTitle
      title={categoryInfo.title}
      description="세계관 속 캐릭터들을 관리해보세요."
      iconName={USABLE_ICON[categoryInfo.iconId as UsableIconKey]}
      rightArea={
        <ButtonBig
          as={"button"}
          iconName={"plus"}
          text={`${categoryInfo.title} 추가`}
          size="large"
          background
          direction="center"
          elementProps={{ className: "w-full md:w-fit" }}
        />
      }
    >
      <CardUL>
        {categoryInfo.entityList.map((entity) => (
          <EntityCard
            key={entity.id}
            id={entity.id}
            worldId={parseInt(worldId)}
            categoryId={parseInt(categoryId)}
            entityId={entity.id}
            title={entity.title}
            description={entity.description}
            imageUrl={entity.imageUrl}
            writer={entity.writer}
          />
        ))}
      </CardUL>
    </PageTitle>
  );
}
