// 사물함 버튼 활성화 -> cabinetData 저장

import { useState, useEffect } from "react";
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

  const fetchCabinetButtonActivation = async (
    building: string,
    floor: number
  ) => {
    try {
      const response = await cabinetCallApi(building, floor);
      setCabinetData(response.cabinets);

      return response;
    } catch (error) {
      if (error === 404) {
        console.error(404);
      }
    }
  };
  useEffect(() => {
    if (selectedBuilding !== null && selectedFloor !== null) {
      fetchCabinetButtonActivation(selectedBuilding.building, selectedFloor);
    }
  }, [selectedBuilding, selectedFloor, isMyCabinet]);

  return {
    cabinetData,
    setCabinetData,
    fetchCabinetButtonActivation,
  };
};
