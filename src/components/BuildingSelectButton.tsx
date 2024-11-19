// 건물, 층 선택 버튼

import { useSearch } from "@/hooks/useSearch";
import { cabinetCallApi } from "@/api/cabinetCallApi";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
interface BuildingSelectButtonProps {
  buildings: { name: string; floors: number[] }[];
  selectedBuilding: string | null;
  setSelectedBuilding: (building: string | null) => void;
  selectedFloor: number | null;
  setSelectedFloor: (floor: number | null) => void;
  setSelectedCabinet: (cabinet: number | null) => void;
}

const BuildingSelectButton = ({
  buildings,
  selectedBuilding,
  setSelectedBuilding,
  selectedFloor,
  setSelectedFloor,
  setSelectedCabinet,
}: BuildingSelectButtonProps) => {
  const { setSearchParams } = useSearch();

  // // React Router의 쿼리스트링을 가져오기 위한 훅 -> 분리 필요
  const [searchParams] = useSearchParams();
  useEffect(() => {
    // 쿼리스트링에서 building과 floor 값을 읽음
    const buildingFromQuery = searchParams.get("building");
    const floorFromQuery = searchParams.get("floor");

    // 쿼리스트링 값이 있으면 상태를 업데이트
    if (!selectedBuilding && buildingFromQuery && floorFromQuery) {
      setSelectedBuilding(buildingFromQuery);
      setSelectedFloor(floorFromQuery);
    }
  }, [searchParams, selectedBuilding, setSelectedBuilding, setSelectedFloor]);

  // 건물, 층에 대한 api
  const handlecabinetCall = async (building: string, floor: number) => {
    try {
      const response = await cabinetCallApi(building, floor);
      setSearchParams({ building, floor: floor.toString() }); // 쿼리스트링
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="overflow-y-auto h-3/5">
        {buildings.map((building) => (
          <div key={building.name} className="mx-2">
            <button
              className={`p-4 w-full text-gray-500 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-150 ${
                selectedBuilding === building.name
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
              onClick={() => {
                setSelectedBuilding(building.name);
                setSelectedFloor(null); // 층 선택 초기화
                setSelectedCabinet(null); // 사물함 선택 초기화
              }}
            >
              {building.name}
            </button>

            {selectedBuilding === building.name && (
              <div className="absolute inset-y-0 left-40 w-24 border-r-2 border-gray-400 flex flex-col pt-20">
                {building.floors.map((floor) => (
                  <button
                    key={floor}
                    className={`p-4 w-auto text-gray-500 hover:bg-blue-600 hover:text-white mx-2 rounded-lg transition-all duration-150 ${
                      selectedFloor === floor
                        ? "bg-blue-600 text-white mx-2"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedFloor(floor); // 선택된 층을 업데이트
                      handlecabinetCall(building.name, floor);
                    }}
                  >
                    {floor}F
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-400 mx-6"></div>
    </div>
  );
};
export default BuildingSelectButton;
