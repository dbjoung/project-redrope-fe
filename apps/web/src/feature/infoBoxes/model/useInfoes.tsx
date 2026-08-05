import type { InfoBoxType } from "@/share/ui/InfoBox";
import { useCallback, useState } from "react";

export function useInfoes() {
  const [infoes, setInfoes] = useState<InfoBoxType[]>([]);

  const addInfo = useCallback((type: InfoBoxType["type"], infoText: string) => {
    setInfoes((prev) => [...prev, { type, infoText }]);
  }, []);

  const clearInfo = useCallback(() => {
    setInfoes([]);
  }, []);

  return { infoes, addInfo, clearInfo };
}
