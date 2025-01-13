// 건물, 층 선택 버튼

import { useSearchResultButton } from "@/hooks/useSearchResultButton";
import { useSearchToMain } from "@/hooks/useSearchToMain";

interface BuildingSelectButtonProps {
  buildingList: { name: string; floors: number[] }[];
  selectedBuilding: string | null;
  setSelectedBuilding: (building: string | null) => void;
  selectedFloor: number | null;
  setSelectedFloor: (floor: number | null) => void;
  setSelectedCabinet: (
    cabinet: {
      cabinetId: number;
      cabinetNumber: number;
    } | null
  ) => void;
}

const BuildingSelectButton = ({
  buildingList,
  selectedBuilding,
  setSelectedBuilding,
  selectedFloor,
  setSelectedFloor,
  setSelectedCabinet,
}: BuildingSelectButtonProps) => {
  const { fetchSearchResultCabinetData } = useSearchResultButton();
  // search result와 동일한 쿼리스트링 페이지로 이동
  useSearchToMain(selectedBuilding, setSelectedBuilding, setSelectedFloor);

  return (
    <div>
      <div className="overflow-y-auto h-3/5 pt-[5rem] w-40">
        {buildingList.map((building) => (
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
                      setSelectedCabinet(null);
                      fetchSearchResultCabinetData(building.name, floor);
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
