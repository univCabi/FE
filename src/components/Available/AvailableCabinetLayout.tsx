import { CabinetData, CabinetInfo } from "@/types/CabinetType";
import { CabinetStatus } from "@/types/StatusEnum";
import { useCabinet } from "@/hooks/useCabinet";
import { useCabinetActivation } from "@/hooks/useCabinetActivation";
import LockSVG from "@/icons/lock.svg?react";

interface AvailableCabinetLayoutProps extends CabinetInfo {
  setSelectedFloor: (floor: number | null) => void;
  isMyCabinet: boolean;
  fetchCabinetDetailInformation: (id: number, cabientNumber: number) => void;
  cabinetDataByFloor: Record<number, CabinetData[]>;
  setCabinetDataByFloor: React.Dispatch<
    React.SetStateAction<Record<string, CabinetData[]>>
  >;
  availableFloors: number[] | null;
}
const AvailableCabinetLayout = ({
  availableFloors,
  selectedBuilding,
  selectedCabinet,
  selectedFloor,
  setSelectedFloor,
  isMyCabinet,
  fetchCabinetDetailInformation,
  cabinetDataByFloor,
  setCabinetDataByFloor,
}: AvailableCabinetLayoutProps) => {
  const { getStatusColor } = useCabinet();
  const { fetchAvailableCabinetData } = useCabinetActivation({
    selectedBuilding,
    selectedFloor,
    isMyCabinet,
    setCabinetDataByFloor,
    availableFloors,
  });
  const rowsPerCol = 4; // 총 몇 줄의 사물함을 배치할 것인지 설정

  return (
    <>
      {availableFloors?.map((floors) => {
        const floorData = cabinetDataByFloor[floors] || [];
        const filteredCabinetData = floorData.filter(
          (cabinet) => cabinet.status === CabinetStatus.AVAILABLE,
        );
        return (
          <div key={floors} className="mt-16">
            <div className="text-2xl text-left text-gray-600 font-bold mx-24">
              {selectedBuilding} {floors}F
            </div>
            {/* 선 */}
            <div className="mt-3 border border-b-1 border-x-0 border-t-0 border-gray-400 mx-20" />
            <div className="relative w-full flex items-center justify-center overflow-y-auto ">
              <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[100%] ml-5">
                {filteredCabinetData.length === 0 ? (
                  <div className="text-left text-gray-500 text-xl mt-5">
                    현재 사용 가능한 사물함이 없습니다.
                  </div>
                ) : (
                  filteredCabinetData.map((cabinet, index) => {
                    const row = Math.floor(index / rowsPerCol);
                    const col = index % rowsPerCol;
                    const isSelected =
                      selectedCabinet?.cabinetId === cabinet.id;
                    return (
                      <button
                        key={cabinet.id}
                        className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2 mt-7
                          ${getStatusColor(cabinet.status, cabinet.isMine)}
                          ${isSelected ? "shadow-md" : ""}
                        `}
                        style={{
                          top: `${col * 100}px`,
                          left: `${row * 90}px`,
                        }}
                        onClick={() => {
                          setSelectedFloor(floors);
                          fetchCabinetDetailInformation(
                            cabinet.id,
                            cabinet.cabinetNumber,
                          );
                        }}
                      >
                        {cabinet.cabinetNumber}
                        {cabinet.status === CabinetStatus.AVAILABLE &&
                          !cabinet.isRentAvailable && (
                            <div className="absolute top-6 right-4">
                              <LockSVG className="h-7 items-center justify-center" />
                            </div>
                          )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default AvailableCabinetLayout;
