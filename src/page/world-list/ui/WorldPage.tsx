import PageTitle from "@widget/layout/ui/PageTitle.tsx";
import WorldList from "./WorldList";

export default function WorldPage() {
  return (
    <PageTitle title={"내 세계"} description={"세계를 만들어 관리해보세요."}>
      <WorldList />
    </PageTitle>
  );
}
