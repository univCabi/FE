// // 사물함 버튼 컴포넌트 배열 관련

import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useCabinetData } from "@/hooks/useCabinetData";

interface CabinetButtonComponentProps {
  selectedBuilding: { name: string } | null;
  selectedFloor: number | null;
  setSelectedCabinet: (cabinetId: number) => void;
}

const CabinetButtonComponent = ({
  selectedBuilding,
  selectedFloor,
  setSelectedCabinet,
}: CabinetButtonComponentProps) => {
  const cabinetData = useCabinetData(selectedBuilding, selectedFloor);

  // 사물함 정보 API 호출
  const handlecabinetDetailInformaion = async (cabinetId: number) => {
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      console.log("사물함 조회 성공", { cabinetId, response });
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "MINE":
        return "bg-lime-500"; // 내 사물함
      case "USING":
        return "bg-purple-500"; // 사용 중
      case "OVERDUE":
        return "bg-red-500"; // 반납 지연
      case "AVAILABLE":
        return "bg-gray-300"; // 이용 가능
      case "BROKEN":
        return "bg-gray-700"; // 사용 불가
      default:
        return ""; // 기본값
    }
  };

  // 각 상태에 따른 텍스트 색상 설정
  const getStatusTextColor = (status: string) => {
    if (status === "AVAILABLE" || status === "MINE") {
      return "text-black"; // AVAILABLE, MINE일 경우 text-black
    }
    return "text-white"; // 나머지 상태는 text-white
  };

  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[100%]">
        {cabinetData.map((cabinet) => {
          // 선택된 층에 대한 floorIndex 가져오기
          const floorIndex =
            selectedBuilding?.floorIndex[
              selectedBuilding.floors.indexOf(selectedFloor ?? "")
            ];
          if (!floorIndex) return null; // floorIndex가 없으면 렌더링 생략

          // 고유 cabinetId 생성
          const cabinetId = (floorIndex - 1) * 48 + cabinet.cabinetNumber;

          return (
            <button
              key={cabinet.cabinetNumber}
              className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2 ${getStatusColor(
                cabinet.status
              )} ${getStatusTextColor(cabinet.status)}`}
              style={{
                top: `${350 - cabinet.cabinetYPos * 100}px`, // API에서 받은 yPos 사용
                left: `${cabinet.cabinetXPos * 90}px`, // API에서 받은 xPos 사용
              }}
              onClick={() => {
                setSelectedCabinet(cabinet.cabinetNumber); // 선택된 사물함 ID 설정
                handlecabinetDetailInformaion(cabinetId); // 상세 정보 호출
              }}
            >
              {cabinet.cabinetNumber}
              {/* cabinetId 확인용 코드 */}
              {/* {cabinetId} */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CabinetButtonComponent;
