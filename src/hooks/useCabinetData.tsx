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
  isMineState: boolean,
  selectedStatus: string
) => {
  const [cabinetData, setCabinetData] = useState<cabinetApiData[]>([]);

  const handleCabinetCall = async (building: string, floor: number) => {
    try {
      const response = await cabinetCallApi(building, floor);
      setCabinetData(response.cabinets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // cabinetData 상태 업데이트 (사물함 버튼 관련)
    setCabinetData((prevData) =>
      prevData.map((cabinet) =>
        cabinet.id === selectedCabinet?.cabinetId
          ? { ...cabinet, isMine: isMineState }
          : cabinet
      )
    );
    if (selectedBuilding !== null && selectedFloor !== null) {
      handleCabinetCall(selectedBuilding.name, selectedFloor);
    }
  }, [
    selectedBuilding,
    selectedFloor,
    // selectedCabinet,
    isMineState,
    // selectedStatus,
  ]);

  console.log("cabinetData: " + JSON.stringify(cabinetData));

  return { cabinetData, setCabinetData, handleCabinetCall };
};
