import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchToMain = (
  selectedBuilding: string | null,
  setSelectedBuilding: (building: string | null) => void,
  setSelectedFloor: (floor: number | null) => void
) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리스트링에서 building과 floor 값을 읽음
    const buildingFromQuery = searchParams.get("building");
    const floorFromQuery = searchParams.get("floor");

    // 쿼리스트링(building, floor)에 값이 있으면 상태를 업데이트
    if (!selectedBuilding && buildingFromQuery && floorFromQuery) {
      setSelectedBuilding(buildingFromQuery);
      setSelectedFloor(floorFromQuery);
    }
  }, [searchParams, selectedBuilding, setSelectedBuilding, setSelectedFloor]);
};

export default useSearchToMain;
