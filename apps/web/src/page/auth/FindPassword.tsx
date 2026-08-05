import ButtonSmall from "@/share/ui/ButtonSmall";
import FindPasswordBox from "@/widget/auth/find-password/ui/FindPasswordBox";
import { useNavigate } from "react-router";

export default function FindPassword() {
  const navigate = useNavigate();
  return (
    <section className="gap-rd-24 flex flex-col items-center justify-center">
      <ButtonSmall
        iconName={"move-left"}
        padded
        rounded
        buttonProps={{ content: "돌아가기", onClick: () => navigate(-1), className: "self-start" }}
      />
      <p className="text-rd-fs-head font-semibold">비밀번호 찾기</p>
      <FindPasswordBox />
    </section>
  );
}
