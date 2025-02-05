// 사물함 배열 관련
import { useEffect } from "react";
import CabinetButtonSkeleton from "@/components/Skeleton/CabinetButtonSkeleton";
import { useCabinet } from "@/hooks/useCabinet";
import { useCabinetActivation } from "@/hooks/useCabinetActivation";

interface CabinetButtonLayoutProps {
  selectedBuilding: { building: string } | null;
  selectedFloor: number | null;
  isMyCabinet: boolean;
  filteredCabinetDetail: {
    id: number;
    cabinetNumber: number;
  } | null;
  fetchCabinetDetailInformation: (id: number, cabientNumber: number) => void;
}

const CabinetButtonLayout = ({
  selectedBuilding,
  selectedFloor,
  isMyCabinet,
  filteredCabinetDetail,
  fetchCabinetDetailInformation,
}: CabinetButtonLayoutProps) => {
  const { getStatusColor } = useCabinet();
  const { cabinetData, loading } = useCabinetActivation({
    selectedBuilding,
    selectedFloor,
    isMyCabinet,
  });
  // 검색 결과에 해당하는 사물함이 있을 경우에만 실행
  useEffect(() => {
    if (filteredCabinetDetail) {
      fetchCabinetDetailInformation(
        filteredCabinetDetail.id,
        filteredCabinetDetail.cabinetNumber,
      );
    }
  }, [filteredCabinetDetail]);

  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      {loading ? (
        <CabinetButtonSkeleton />
      ) : (
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
                    cabinet.cabinetNumber,
                  );
                }}
              >
                {cabinet.cabinetNumber}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CabinetButtonLayout;
