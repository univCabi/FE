// 사물함 버튼 컴포넌트 배열 관련
import { cabinetCallApi } from "@/api/cabinetCallApi";

import { useState, useEffect } from "react";

interface CabinetButtonComponentProps {
  selectedBuilding: { name: string } | null;
  selectedFloor: number | null;
  setSelectedCabinet: (cabinetNumber: number) => void;
}
interface cabinetApiData {
  cabinetNumber: number;
  xPos: number;
  yPos: number;
  status: string;
}

const CabinetButtonComponent = ({
  selectedBuilding,
  selectedFloor,
  setSelectedCabinet,
}: CabinetButtonComponentProps) => {
  const [cabinetData, setCabinetData] = useState<cabinetApiData[]>([]);

  const handleCabinetCall = async (building: string, floor: number) => {
    try {
      const response = await cabinetCallApi(building, floor);
      // setCabinetData(response?.cabinets || []); // 응답 데이터에서 사물함 목록 업데이트
      setCabinetData(response.cabinets);
    } catch (error) {
      console.log(error);
    }
  };

  // building, floor 값이 변경될 때마다 API 호출
  useEffect(() => {
    if (selectedBuilding !== null && selectedFloor !== null) {
      handleCabinetCall(selectedBuilding.name, selectedFloor);
    }
  }, [selectedBuilding, selectedFloor]);

  return (
    <div className="w-full">
      <div className="relative top-14 left-1/3 w-[30rem] h-5/6 flex items-center justify-center overflow-scroll">
        {cabinetData.map((cabinet) => (
          <button
            key={cabinet.cabinetNumber} // 데이터의 cabinetNumber를 키로 사용
            className="absolute w-16 h-20 rounded-md bg-gray-300 text-gray-500 text-sm hover:bg-gray-200 flex items-end p-2"
            style={{
              top: `${1000 - cabinet.yPos}px`, // // API에서 받은 yPos 사용 -> yPos 값을 반전 (yPos 값이 작은 cabinet이 위로 배치됨)
              left: `${cabinet.xPos}px`, // API에서 받은 xPos 사용
            }}
            onClick={() => setSelectedCabinet(cabinet.cabinetNumber)}
          >
            {cabinet.cabinetNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CabinetButtonComponent;
