import { useEffect } from "react";
import { CabinetData, CabinetInfo } from "@/types/CabinetType";
import { CabinetStatus } from "@/types/StatusEnum";
import { UserData } from "@/types/UserType";
import { useCabinet } from "@/hooks/useCabinet";
import { useCabinetActivation } from "@/hooks/useCabinetActivation";
import LockSVG from "@/icons/lock.svg?react";
import affiliationBuildingData from "@/mocks/affiliatioinBuildingData.json";

interface AvailableCabinetLayoutProps extends CabinetInfo {
  setSelectedBuilding: (building: string | null) => void;
  setSelectedFloor: (floor: number | null) => void;
  isMyCabinet: boolean;
  fetchCabinetDetailInformation: (id: number, cabientNumber: number) => void;
  cabinetDataByFloor: Record<number, CabinetData[]>;
  setCabinetDataByFloor: React.Dispatch<
    React.SetStateAction<Record<string, CabinetData[]>>
  >;
  userData: UserData;
  availableFloors: number[] | null;
  setAvailableFloors: (floors: number[] | null) => void;
  setSaveAffiliation: (affiliation: string | null) => void;
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
  setSelectedBuilding,
  userData,
  setAvailableFloors,
  setSaveAffiliation,
}: AvailableCabinetLayoutProps) => {
  const { getStatusColor } = useCabinet();
  const rowsPerCol = 4; // 총 몇 줄의 사물함을 배치할 것인지 설정
  const { fetchAvailableCabinetData } = useCabinetActivation({
    selectedBuilding,
    selectedFloor,
    isMyCabinet,
    setCabinetDataByFloor,
  });
  useEffect(() => {
    if (location.pathname.startsWith("/available")) {
      if (selectedBuilding !== null && availableFloors !== null) {
        fetchAvailableCabinetData(selectedBuilding, availableFloors);
      }
    }
  }, [selectedBuilding, availableFloors]);
  // 학과에 해당하는 건물 및 층 정보 찾기
  useEffect(() => {
    setSaveAffiliation(userData.affiliation);
    const affiliationData = affiliationBuildingData.find(
      (item) => item.affiliation === userData.affiliation,
    );
    if (affiliationData) {
      setSelectedBuilding(affiliationData.building);
      setAvailableFloors(affiliationData.floors);
    }
  }, [userData.affiliation]);
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
