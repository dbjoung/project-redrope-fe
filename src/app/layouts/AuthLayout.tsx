import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <section className="rd-background-gradient p-rd-4 flex h-screen w-screen items-center justify-center">
      <main className="w-full max-w-[620px]">
        <Outlet />
      </main>
    </section>
  );
}
