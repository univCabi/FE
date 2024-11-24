// // 사물함 버튼 컴포넌트 배열 관련

import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useCabinetData } from "@/hooks/useCabinetData";

interface CabinetButtonComponentProps {
  selectedBuilding: {
    name: string;
    floors: string[]; // 층 리스트
  } | null;
  selectedFloor: number | null;
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;

  setSelectedCabinet: (
    cabinet: {
      cabinetId: number;
      cabinetNumber: number;
    } | null
  ) => void; // 수정

  setSelectedStatus: (status: string) => void; // 추가
}

const CabinetButtonComponent = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
  setSelectedCabinet,
  setSelectedStatus, // 추가
}: CabinetButtonComponentProps) => {
  const cabinetData = useCabinetData(selectedBuilding, selectedFloor);

  // 사물함 정보 API 호출
  const handlecabinetDetailInformaion = async (
    cabinetId: number,
    cabinetNumber: number
  ) => {
    try {
      const response = await cabinetDetailInfoApi(cabinetId);

      setSelectedCabinet({ cabinetId, cabinetNumber });
      setSelectedStatus(response.status);

      console.log("사물함 조회 성공", response);

      return response.data;
    } catch (error) {
      if (error === 400) {
        console.error(error);
      } else if (error === 404) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };

  // 각 상태에 대한 버튼 색상 설정
  const getStatusColor = (status: string, isMine: boolean | null) => {
    if (status === "USING" && isMine === true) {
      return "bg-purple-500"; // 본인이 사용 중인 사물함
    }
    switch (status) {
      case "USING":
        return "bg-purple-500";
      case "OVERDUE":
        return "bg-red-500"; // 반납 지연
      case "AVAILABLE":
        return "bg-gray-300"; // 이용 가능
      case "BROKEN":
        return "bg-gray-700"; // 사용 불가
    }
  };
  // 각 상태에 따른 텍스트 색상 설정
  const getStatusTextColor = (status: string) => {
    if (status === "AVAILABLE") {
      return "text-black"; // AVAILABLE, MINE일 경우 text-black
    }
    return "text-white"; // 나머지 상태는 text-white
  };

  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[100%]">
        {cabinetData.map((cabinet) => {
          return (
            <button
              // disabled={cabinet.isMine === false && cabinet.status === "USING"}
              key={cabinet.cabinetNumber}
              className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2 ${getStatusColor(
                cabinet.status,
                cabinet.isMine // isMine을 전달
              )} ${getStatusTextColor(cabinet.status)}`}
              style={{
                top: `${350 - cabinet.cabinetYPos * 100}px`, // API에서 받은 yPos 사용
                left: `${cabinet.cabinetXPos * 90}px`, // API에서 받은 xPos 사용
              }}
              onClick={() => {
                handlecabinetDetailInformaion(
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
