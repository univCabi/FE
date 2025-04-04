import { useState } from "react";
import { CabinetData } from "@/types/CabinetType";

export const useAvailableCabinet = () => {
  const [availableFloors, setAvailableFloors] = useState<number[] | null>(null);
  const [cabinetDataByFloor, setCabinetDataByFloor] = useState<
    Record<number, CabinetData[]>
  >({}); // 층별 사물함 데이터를 저장 -> 따로 렌더링
  const [leftTime, setLeftTime] = useState(""); // 남은 시간
  const [saveAffiliation, setSaveAffiliation] = useState<string | null>(null); // 학과 저장

  return {
    availableFloors,
    setAvailableFloors,
    cabinetDataByFloor,
    setCabinetDataByFloor,
    leftTime,
    setLeftTime,
    saveAffiliation,
    setSaveAffiliation,
  };
};
