import LoginBox from "@feature/login/ui/LoginBox.tsx";

export default function LoginPage() {
  return (
    <section className="gap-rd-24 flex flex-col items-center justify-center">
      <h1 className="text-rd-fs-logo font-semibold">홍연의 서</h1>
      <p className="text-rd-fs-title-sub font-light">붉은 실로 이어지는 인연들</p>
      <LoginBox />
    </section>
  );
}
