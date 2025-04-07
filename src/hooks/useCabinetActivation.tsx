// 사물함 버튼 활성화 -> cabinetData 저장
import { useEffect, useState } from "react";
import { BuildingInfo, CabinetData } from "@/types/CabinetType";
import { log } from "@/utils/logger";
import { cabinetCallApi } from "@/api/cabinetCallApi";

interface UseCabinetActivationProps extends BuildingInfo {
  isMyCabinet: boolean;
  setCabinetDataByFloor: React.Dispatch<
    React.SetStateAction<Record<string, CabinetData[]>>
  >;
  availableFloors: number[] | null;
}

export const useCabinetActivation = ({
  selectedBuilding,
  selectedFloor,
  isMyCabinet,
  setCabinetDataByFloor,
  availableFloors,
}: UseCabinetActivationProps) => {
  const [cabinetData, setCabinetData] = useState<CabinetData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 사물함 API 호출
  // Main Page
  const fetchCabinetData = async (building: string, floor: number) => {
    try {
      setIsLoading(true);
      const response = await cabinetCallApi(building, floor);
      setCabinetData(response);
      log.info(
        `API 호출 성공: cabinetCallApi, ${JSON.stringify(response, null, 2)}`,
      );
      return response;
    } catch (error) {
      log.error(`API 호출 중 에러 발생: cabinetCallApi ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Available Page
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
    if (location.pathname.startsWith("/main")) {
      if (selectedBuilding !== null && selectedFloor !== null) {
        fetchCabinetData(selectedBuilding, selectedFloor);
      }
    }
  }, [selectedBuilding, selectedFloor, isMyCabinet]);

  useEffect(() => {
    if (location.pathname.startsWith("/available")) {
      if (selectedBuilding !== null && availableFloors !== null) {
        fetchAvailableCabinetData(selectedBuilding, availableFloors);
      }
    }
  }, [selectedBuilding, availableFloors]);

  return {
    cabinetData,
    setCabinetData,
    fetchCabinetData,
    isLoading,
    fetchAvailableCabinetData,
  };
};
