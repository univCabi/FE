// 사물함 버튼 활성화 -> cabinetData 저장
import { useEffect, useState } from "react";
import { BuildingInfo, CabinetData } from "@/types/CabinetType";
import { log } from "@/utils/logger";
import { cabinetCallApi } from "@/api/cabinetCallApi";

interface UseCabinetActivationProps extends BuildingInfo {
  isMyCabinet: boolean;
}

export const useCabinetActivation = ({
  selectedBuilding,
  selectedFloor,
  isMyCabinet,
}: UseCabinetActivationProps) => {
  const [cabinetData, setCabinetData] = useState<CabinetData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 사물함 API 호출
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

  useEffect(() => {
    if (location.pathname.startsWith("/main")) {
      if (selectedBuilding !== null && selectedFloor !== null) {
        fetchCabinetData(selectedBuilding, selectedFloor);
      }
    }
  }, [selectedBuilding, selectedFloor, isMyCabinet]);

  return {
    cabinetData,
    setCabinetData,
    fetchCabinetData,
    isLoading,
    setIsLoading,
  };
};
