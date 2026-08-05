import { InfoBox, type InfoBoxType } from "@/share/ui/InfoBox";

export function InfoBoxes({ infoes }: { infoes: InfoBoxType[] }) {
  return (
    <section className="gap-rd-8 flex flex-col">
      {infoes.map((info, i) => (
        <InfoBox key={i} {...info} />
      ))}
    </section>
  );
}
