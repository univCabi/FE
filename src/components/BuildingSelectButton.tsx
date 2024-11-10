// 건물, 층 선택 버튼

import axios from "axios";

interface BuildingSelectButtonProps {
  buildings: { name: string; floors: string[] }[];
  selectedBuilding: number | null;
  setSelectedBuilding: (index: number | null) => void;
  selectedFloor: number | null;
  setSelectedFloor: (floor: number | null) => void;
}

const BuildingSelectButton = ({
  buildings,
  selectedBuilding,
  setSelectedBuilding,
  selectedFloor,
  setSelectedFloor,
}: BuildingSelectButtonProps) => {
  // api
  const cabinetCallApi = async (building: string, floor: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/cabinet/main?building=${building}&floor=${floor}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="overflow-y-auto h-3/5">
        {buildings.map((building, index) => (
          <div key={index} className="mx-2">
            <button
              className={`p-4 w-full text-gray-500 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-150 ${
                selectedBuilding === index ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => {
                setSelectedBuilding(index);
                setSelectedFloor(null);
              }}
            >
              {building.name}
            </button>

            {selectedBuilding === index && (
              <div className="absolute inset-y-0 left-40 w-24 border-r-2 border-gray-400 flex flex-col pt-20">
                {building.floors.map((floor, floorIndex) => (
                  <button
                    key={floorIndex}
                    className={`p-4 w-auto text-gray-500 hover:bg-blue-600 hover:text-white mx-2 rounded-lg transition-all duration-150 ${
                      selectedFloor === floorIndex
                        ? "bg-blue-600 text-white mx-2"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedFloor(floorIndex); // 선택된 층을 업데이트
                      cabinetCallApi(building, floor);
                    }}
                  >
                    {floor}
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
