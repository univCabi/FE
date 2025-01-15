// 사물함 배열 관련

import { useCabinetData } from "@/hooks/useCabinetData";
import { useCabinetState } from "@/hooks/useCabinetState";
import { useCabinetDetailData } from "@/hooks/useCabinetDetailData";

interface CabinetButtonLayoutProps {
  selectedBuilding: { name: string } | null;
  selectedFloor: number | null;
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
  setSelectedCabinet,
  setSelectedStatus,
  isMyCabinet,
  setIsMyCabinet,
  filteredCabinetDetail,
}: CabinetButtonLayoutProps) => {
  const { cabinetData } = useCabinetData(
    selectedBuilding,
    selectedFloor,
    // selectedCabinet,
    isMyCabinet
  );
  const { fetchCabinetDetailInformation } = useCabinetDetailData({
    cabinetData,
    filteredCabinetDetail,
    setSelectedCabinet,
    setSelectedStatus,
    setIsMyCabinet,
  });
  const { getStatusColor } = useCabinetState();

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
