// 사물함 API에서 data 불러오기 위한 hook

import { useState, useEffect } from "react";
import { cabinetCallApi } from "@/api/cabinetCallApi";

interface cabinetApiData {
  cabinetNumber: number;
  xPos: number;
  yPos: number;
  status: string;
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
