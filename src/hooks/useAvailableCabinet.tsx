import { useEffect, useState } from "react";
import { AvailableFloorInfo, CabinetData } from "@/types/CabinetType";
import affiliationBuildingData from "@/mocks/affiliatioinBuildingData.json";

interface AvailableCabinetProps extends AvailableFloorInfo {}

export const useAvailableCabinet = ({
  setSelectedBuilding,
  userData,
}: AvailableCabinetProps) => {
  const [availableFloors, setAvailableFloors] = useState<number[] | null>(null);
  const [cabinetDataByFloor, setCabinetDataByFloor] = useState<
    Record<number, CabinetData[]>
  >({}); // 층별 사물함 데이터를 저장 -> 따로 렌더링
  const [leftTime, setLeftTime] = useState(""); // 남은 시간
  const [saveAffiliation, setSaveAffiliation] = useState<string | null>(null); // 학과 저장

  // 학과에 해당하는 건물 및 층 정보 찾기
  useEffect(() => {
    setSaveAffiliation(userData.affiliation);
    const affiliationData = affiliationBuildingData.find(
      (item) => item.affiliation === userData.affiliation,
    );
    if (affiliationData) {
      setSelectedBuilding(affiliationData.building);
      setAvailableFloors(affiliationData.floors);
    }
  }, [userData.affiliation]);

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
