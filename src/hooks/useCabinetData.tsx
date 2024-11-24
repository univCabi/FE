// 사물함 API에서 data 불러오기 위한 hook

import { useState, useEffect } from "react";
import { cabinetCallApi } from "@/api/cabinetCallApi";

interface cabinetApiData {
  id: number; // 사물함 고유 ID
  cabinetNumber: number; // UI에 표시되는 사물함 번호
  cabinetXPos: number;
  cabinetYPos: number;
  status: string;
  isVisible: boolean | null;
  username: string | null;
  isMine: boolean | null;
}

export const useCabinetData = (
  selectedBuilding: { name: string } | null,
  selectedFloor: number | null
) => {
  const [cabinetData, setCabinetData] = useState<cabinetApiData[]>([]);

  useEffect(() => {
    const handleCabinetCall = async (building: string, floor: number) => {
      try {
        const response = await cabinetCallApi(building, floor);
        setCabinetData(response.cabinets);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedBuilding !== null && selectedFloor !== null) {
      handleCabinetCall(selectedBuilding.name, selectedFloor);
    }
  }, [selectedBuilding, selectedFloor]);

  return cabinetData;
};
