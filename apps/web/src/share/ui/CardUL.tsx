import type { ReactNode } from "react";

export default function CardUL({ children }: { children: ReactNode }) {
  return (
    <section className="gap-rd-32 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] justify-center transition-all duration-300 ease-in-out hover:-translate-y-1">
      {children}
    </section>
  );
}
