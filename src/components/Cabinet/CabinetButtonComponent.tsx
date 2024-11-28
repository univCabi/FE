// // 사물함 버튼 컴포넌트 배열 관련

import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useCabinetData } from "@/hooks/useCabinetData";
import { useEffect } from "react";

interface CabinetButtonComponentProps {
  selectedBuilding: { name: string; floors: number } | null;
  selectedFloor: number | null;
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
  setSelectedCabinet: (
    cabinet: { cabinetId: number; cabinetNumber: number } | null
  ) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  isMineState: boolean;
  setIsMineState: (isMine: boolean) => void;
  filteredCabinetDetail: {
    id: number;
    status: string;
    isMine: boolean;
    cabinetNumber: number;
  } | null;
}

const CabinetButtonComponent = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
  setSelectedCabinet,
  selectedStatus,
  setSelectedStatus,
  isMineState,
  setIsMineState,
  filteredCabinetDetail,
}: CabinetButtonComponentProps) => {
  const { cabinetData } = useCabinetData(
    selectedBuilding,
    selectedFloor,
    selectedCabinet,
    isMineState,
    selectedStatus
  );

  // 사물함 정보 API 호출
  const handleCabinetDetailInformaion = async (
    cabinetId: number,
    cabinetNumber: number
  ) => {
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      setSelectedCabinet({ cabinetId, cabinetNumber });
      setSelectedStatus(response.status); // status 저장
      setIsMineState(response.isMine); // isMine 저장
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
        handleCabinetDetailInformaion(
          matchedCabinet.id,
          matchedCabinet.cabinetNumber
        );
      }
    }
    return;
  }, [cabinetData]);

  // 각 상태에 대한 버튼 색상 설정
  const getStatusColor = (selectedStatus: string, isMineState: boolean) => {
    // console.log(
    //   "selectedStauts :" + selectedStatus + " " + "isMineState: " + isMineState
    // );
    if (selectedStatus === "USING") {
      if (isMineState === true) {
        return "bg-lime-500 text-white"; // 본인이 사용 중인 사물함
      }
      if (isMineState === false) {
        return "bg-purple-500 text-white"; // 다른 사람이 사용 중인 사물함
      }
    }
    switch (selectedStatus) {
      case "OVERDUE":
        return "bg-red-500 text-white"; // 반납 지연
      case "AVAILABLE":
        return "bg-gray-300"; // 이용 가능
      case "BROKEN":
        return "bg-gray-700 text-white"; // 사용 불가
    }
  };

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
                handleCabinetDetailInformaion(
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

export default CabinetButtonComponent;
