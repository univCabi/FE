// 사물함 배열 관련
import { useEffect } from "react";
import { CabinetDetailInfo, CabinetInfo } from "@/types/CabinetType";
import { CabinetStatus } from "@/types/StatusEnum";
import CabinetButtonSkeleton from "@/components/Skeleton/CabinetButtonSkeleton";
import { useCabinet } from "@/hooks/useCabinet";
import { useCabinetActivation } from "@/hooks/useCabinetActivation";
import BookmarkAddSVG from "@/icons/bookmarkAdd.svg?react";
import LockSVG from "@/icons/lock.svg?react";
import PayableSVG from "@/icons/payable.svg?react";

interface CabinetButtonLayoutProps extends CabinetDetailInfo, CabinetInfo {
  bookmarkIds: number[];
}

const CabinetButtonLayout = ({
  selectedBuilding,
  selectedFloor,
  isMyCabinet,
  filteredCabinetDetail,
  fetchCabinetDetailInformation,
  selectedCabinet,
  bookmarkIds,
}: CabinetButtonLayoutProps) => {
  const { getStatusColor } = useCabinet();

  const { cabinetData, isLoading } = useCabinetActivation({
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
      {isLoading ? (
        <CabinetButtonSkeleton />
      ) : (
        <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[90%]">
          {cabinetData ? (
            cabinetData.map((cabinet) => {
              const isSelected = selectedCabinet?.cabinetId === cabinet.id;
              return (
                <button
                  key={cabinet.cabinetNumber}
                  className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2 
                      ${getStatusColor(cabinet.status, cabinet.isMine)} 
                      ${isSelected ? "shadow-md" : ""}
                  `}
                  style={{
                    top: `${350 - cabinet.cabinetYPos * 100}px`,
                    left: `${cabinet.cabinetXPos * 90}px`,
                  }}
                  onClick={() => {
                    fetchCabinetDetailInformation(
                      cabinet.id,
                      cabinet.cabinetNumber,
                    );
                  }}
                >
                  {cabinet.cabinetNumber}
                  {bookmarkIds.includes(cabinet.id) && (
                    <div className="absolute -top-1 left-1">
                      <BookmarkAddSVG width={13} />
                    </div>
                  )}
                  {cabinet.isFree === false && (
                    <div className="absolute -top-1 right-1">
                      <PayableSVG width={16} />
                    </div>
                  )}
                  {cabinet.status === CabinetStatus.AVAILABLE &&
                    cabinet.isRentAvailable === false && (
                      <div className="absolute top-6 right-4">
                        <LockSVG className="h-7 items-center justify-center" />
                      </div>
                    )}
                </button>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">
              사물함 정보를 불러올 수 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CabinetButtonLayout;
