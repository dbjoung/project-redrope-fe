import ButtonSmall from "@/share/ui/ButtonSmall";
import JoinBox from "@/widget/auth/join/ui/JoinBox";
import { useNavigate } from "react-router";

export default function Join() {
  const navigate = useNavigate();
  return (
    <section className="gap-rd-24 flex flex-col items-center justify-center">
      <ButtonSmall
        iconName={"move-left"}
        padded
        rounded
        buttonProps={{ content: "돌아가기", onClick: () => navigate(-1), className: "self-start" }}
      />
      <p className="text-rd-fs-head font-semibold">회원가입</p>
      <JoinBox />
    </section>
  );
}
