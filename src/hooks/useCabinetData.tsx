// 사물함 API에서 data 불러오기 위한 hook
import { useState, useEffect } from "react";
import { cabinetCallApi } from "@/api/cabinetCallApi";

interface cabinetApiData {
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

export const useCabinetData = (
  selectedBuilding: { name: string } | null,
  selectedFloor: number | null,
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null,
  isMyCabinet: boolean
) => {
  const [cabinetData, setCabinetData] = useState<cabinetApiData[]>([]);

  // building, floor 선택 -> 사물함 버튼 활성화
  const fetchCabinetData = async (building: string, floor: number) => {
    try {
      const response = await cabinetCallApi(building, floor);
      setCabinetData(response.cabinets);
    } catch (error) {
      if (error === 404) {
        console.error(404);
      }
    }
  };

  useEffect(() => {
    // cabinetData 상태 업데이트 (사물함 버튼 관련)
    setCabinetData((prevData) =>
      prevData.map((cabinet) =>
        cabinet.id === selectedCabinet?.cabinetId ? { ...cabinet } : cabinet
      )
    );
    if (selectedBuilding !== null && selectedFloor !== null) {
      fetchCabinetData(selectedBuilding.name, selectedFloor);
    }
  }, [selectedBuilding, selectedFloor, isMyCabinet]);

  return { cabinetData, setCabinetData, fetchCabinetData };
};
