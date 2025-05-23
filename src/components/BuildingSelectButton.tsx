// 건물, 층 선택 버튼
import {
  BuildingData,
  BuildingInfo,
  SelectedCabinet,
} from "@/types/CabinetType";
import { useSearch } from "@/hooks/useSearch";
import { useSearchToMain } from "@/hooks/useSearchToMain";

interface BuildingSelectButtonProps extends BuildingInfo {
  buildingList: BuildingData[];
  setSelectedBuilding: (building: string | null) => void;
  setSelectedFloor: (floor: number | null) => void;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
}

const BuildingSelectButton = ({
  buildingList,
  selectedBuilding,
  setSelectedBuilding,
  setSelectedFloor,
  selectedFloor,
  setSelectedCabinet,
}: BuildingSelectButtonProps) => {
  // search result와 동일한 쿼리스트링 페이지로 이동
  useSearchToMain(selectedBuilding, setSelectedBuilding, setSelectedFloor);
  const { setSearchParams } = useSearch();

  return (
    <div>
      <div className="overflow-y-auto h-3/5 pt-[5rem] w-40">
        {buildingList.map((buildingData) => (
          <div key={buildingData.building} className="mx-2">
            <button
              className={`p-4 w-full text-gray-500 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-150 ${
                selectedBuilding === buildingData.building
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
              onClick={() => {
                setSelectedBuilding(buildingData.building);
                setSelectedFloor(null);
                setSelectedCabinet(null);
              }}
            >
              {buildingData.building}
            </button>

            {selectedBuilding === buildingData.building && (
              <div className="absolute inset-y-0 left-40 w-24 border-r-2 border-gray-400 flex flex-col pt-20">
                {buildingData.floor.map((floor) => (
                  <button
                    key={floor}
                    className={`p-4 w-auto text-gray-500 hover:bg-blue-600 hover:text-white mx-2 rounded-lg transition-all duration-150 ${
                      selectedFloor === floor
                        ? "bg-blue-600 text-white mx-2"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedFloor(floor);
                      setSelectedCabinet(null);
                      setSearchParams({
                        building: buildingData.building,
                        floors: floor.toString(),
                      });
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
