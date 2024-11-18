// 사물함 버튼 컴포넌트 배열 관련

import { useCabinetData } from "@/hooks/useCabinetData";

interface CabinetButtonComponentProps {
  selectedBuilding: { name: string } | null;
  selectedFloor: number | null;
  setSelectedCabinet: (cabinetNumber: number) => void;
}

const CabinetButtonComponent = ({
  selectedBuilding,
  selectedFloor,
  setSelectedCabinet,
}: CabinetButtonComponentProps) => {
  const cabinetData = useCabinetData(selectedBuilding, selectedFloor);

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
    <div className="w-full">
      <div className="relative top-14 left-1/3 w-[30rem] h-5/6 flex items-center justify-center overflow-scroll">
        {cabinetData.map((cabinet) => (
          <button
            key={cabinet.cabinetNumber}
            className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2 ${getStatusColor(
              cabinet.status
            )} ${getStatusTextColor(cabinet.status)}`}
            style={{
              top: `${1000 - cabinet.yPos}px`, // API에서 받은 yPos 사용
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
