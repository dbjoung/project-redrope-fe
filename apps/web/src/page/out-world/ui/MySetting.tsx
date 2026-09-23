import { useQuery } from "@tanstack/react-query";
import PageTitle from "@widget/layout/ui/PageTitle.tsx";
import { useEffect } from "react";
import { fetchMySetting } from "../api/fetchMySetting";
import { useAuth } from "@/share/model/useAuth";
import type { UserType } from "@redrope/shared";
import { ChangePassword } from "@/feature/change-my-setting/ui/change-password";
import { ChangeNickname } from "@/feature/change-my-setting/ui/change-nickname";
import { EmailBox } from "@/entity/user/ui/EmailBox";
import { useClient } from "@/share/model/useClient";

export default function MySettingPage() {
  const client = useClient();

  const { data: loadData, isPending } = useQuery<UserType>({
    queryKey: ["loadData", client],
    queryFn: async () => fetchMySetting(client),
  });

  const { getUser, setUser } = useAuth();

  useEffect(() => {
    console.log(loadData);
    if (isPending || !loadData) return;
    setUser(loadData);
  }, [isPending, loadData, setUser]);

  return (
    <PageTitle title={"내 설정"} description={"내 설정을 관리하세요."} iconName="sparkle">
      <section className="gap-rd- gap-rd-24 flex flex-col">
        <EmailBox getUser={getUser} />
        <ChangeNickname getUser={getUser} setUser={setUser} />
        <hr className="bg-rd-surface-blue-100 h-0.5 border-none" />
        <ChangePassword />
      </section>
    </PageTitle>
  );
}
