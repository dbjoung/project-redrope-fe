import { LabelBox } from "@/share/ui/LabelBox";
import type { UserType } from "@redrope/shared";

export const EmailBox = ({ getUser }: { getUser: () => UserType | null }) => {
  return (
    <div className="gap-rd-16 px-rd-20 py-rd-24 rounded-rd-8 bg-rd-white rd-box-shadow flex flex-col">
      <LabelBox
        iconInfo={{ name: "message-circle-more", customize: { size: 24 } }}
        text={"이메일"}
        textVariant="medium"
        children={<p>이메일은 변경할 수 없습니다.</p>}
      />
      <p className="text-rd-fs-hard">{getUser()?.email}</p>
    </div>
  );
};
