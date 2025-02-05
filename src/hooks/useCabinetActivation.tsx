// 사물함 버튼 활성화 -> cabinetData 저장
import { useEffect, useState } from "react";
import { log } from "@/utils/logger";
import { cabinetCallApi } from "@/api/cabinetCallApi";

interface CabinetData {
  floor: number;
  section: string;
  building: string;
  id: number;
  cabinetNumber: number;
  cabinetXPos: number;
  cabinetYPos: number;
  status: string;
  isVisible: boolean | null;
  username: string | null;
  isMine: boolean;
  expiredAt: string | null;
}

interface UseCabinetActivationProps {
  selectedBuilding: { building: string } | null;
  selectedFloor: number | null;
  isMyCabinet: boolean;
}

export const useCabinetActivation = ({
  selectedBuilding,
  selectedFloor,
  isMyCabinet,
}: UseCabinetActivationProps) => {
  const [cabinetData, setCabinetData] = useState<CabinetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 사물함 API 호출
  const fetchCabinetData = async (building: string, floor: number) => {
    try {
      setLoading(true);
      const response = await cabinetCallApi(building, floor);
      setCabinetData(response.cabinets);
      log.info(
        `API 호출 성공: cabinetCallApi, ${JSON.stringify(response, null, 2)}`,
      );
      return response;
    } catch (error) {
      log.error("API 호출 중 에러 발생: cabinetCallApi");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedBuilding !== null && selectedFloor !== null) {
      fetchCabinetData(selectedBuilding.building, selectedFloor);
    }
  }, [selectedBuilding, selectedFloor, isMyCabinet]);

  return {
    cabinetData,
    setCabinetData,
    fetchCabinetData,
    loading,
  };
};
