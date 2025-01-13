// 사물함 배열 관련

import { useEffect } from "react";
import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useCabinetData } from "@/hooks/useCabinetData";
import { useCabinetState } from "@/hooks/useCabinetState";

interface CabinetButtonLayoutProps {
  selectedBuilding: { name: string } | null;
  selectedFloor: number | null;
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
  setSelectedCabinet: (
    cabinet: { cabinetId: number; cabinetNumber: number } | null
  ) => void;
  setSelectedStatus: (status: string) => void;
  isMyCabinet: boolean;
  setIsMyCabinet: (isMine: boolean) => void;
  filteredCabinetDetail: {
    id: number;
    status: string;
    isMine: boolean;
    cabinetNumber: number;
  } | null;
}

const CabinetButtonLayout = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
  setSelectedCabinet,
  setSelectedStatus,
  isMyCabinet,
  setIsMyCabinet,
  filteredCabinetDetail,
}: CabinetButtonLayoutProps) => {
  const { cabinetData } = useCabinetData(
    selectedBuilding,
    selectedFloor,
    selectedCabinet,
    isMyCabinet
  );

  const { getStatusColor } = useCabinetState();

  // 사물함 정보 API 호출
  const fetchCabinetDetailInformation = async (
    cabinetId: number,
    cabinetNumber: number
  ) => {
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      setSelectedCabinet({ cabinetId, cabinetNumber });
      setSelectedStatus(response.status); // status 저장
      setIsMyCabinet(response.isMine); // isMine 저장
      console.log(200);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (filteredCabinetDetail) {
      // cabinetNumber로 cabinetData에서 매칭되는 cabinet 찾기
      const matchedCabinet = cabinetData.find(
        (cabinet) =>
          cabinet.cabinetNumber === filteredCabinetDetail.cabinetNumber
      );

      if (matchedCabinet) {
        // cabinetId를 사용하여 상세 정보 API 호출
        fetchCabinetDetailInformation(
          matchedCabinet.id,
          matchedCabinet.cabinetNumber
        );
      }
    }
    return;
  }, [cabinetData]);

  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[100%]">
        {cabinetData.map((cabinet) => {
          return (
            <button
              key={cabinet.cabinetNumber}
              className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2
                ${getStatusColor(cabinet.status, cabinet.isMine)} 
                
              `}
              style={{
                top: `${350 - cabinet.cabinetYPos * 100}px`, // API에서 받은 yPos 사용
                left: `${cabinet.cabinetXPos * 90}px`, // API에서 받은 xPos 사용
              }}
              onClick={() => {
                fetchCabinetDetailInformation(
                  cabinet.id,
                  cabinet.cabinetNumber
                );
              }}
            >
              {cabinet.cabinetNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CabinetButtonLayout;
