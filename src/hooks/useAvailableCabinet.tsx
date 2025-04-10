import { useEffect, useState } from "react";
import { CabinetData } from "@/types/CabinetType";
import { UserData } from "@/types/UserType";
import { log } from "@/utils/logger";
import { cabinetCallApi } from "@/api/cabinetCallApi";
import affiliationBuildingData from "@/mocks/affiliatioinBuildingData.json";

interface testProps {
  userData: UserData;
  setSelectedBuilding: (building: string | null) => void;
  selectedBuilding: string | null;
  selectedStatus: string;
}

export const useAvailableCabinet = ({
  userData,
  setSelectedBuilding,
  selectedBuilding,
  selectedStatus,
}: testProps) => {
  const [availableFloors, setAvailableFloors] = useState<number[] | null>(null);
  const [cabinetDataByFloor, setCabinetDataByFloor] = useState<
    Record<number, CabinetData[]>
  >({}); // 층별 사물함 데이터를 저장 -> 따로 렌더링
  const [saveAffiliation, setSaveAffiliation] = useState<string | null>(null); // 학과 저장
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Available Page 사물함 데이터 불러오기
  const fetchAvailableCabinetData = async (
    building: string,
    floors: number[],
  ) => {
    try {
      setIsLoading(true);
      const fetchFloorDataPromises = floors.map(async (floor) => {
        const response = await cabinetCallApi(building, [floor]); // 각 층을 개별 호출
        return { floor, data: response };
      });
      const results = await Promise.all(fetchFloorDataPromises);
      // 층별 데이터를 객체로 저장 (예: { 2: data, 7: data })
      const newData: Record<string, CabinetData[]> = {};
      results.forEach(({ floor, data }) => {
        newData[floor] = data;
      });
      setCabinetDataByFloor(newData);
    } catch (error) {
      log.error(`API 호출 중 에러 발생: cabinetCallApi ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith("/available")) {
      if (selectedBuilding !== null && availableFloors !== null) {
        fetchAvailableCabinetData(selectedBuilding, availableFloors);
      }
    }
  }, [selectedBuilding, availableFloors, selectedStatus]);

  // 사용자 학과 건물에 해당하는 층별 사물함
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
    saveAffiliation,
    setSaveAffiliation,
    fetchAvailableCabinetData,
  };
};
