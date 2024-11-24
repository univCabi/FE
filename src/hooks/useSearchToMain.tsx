// 검색 결과 버튼 누르면 쿼리스트링을 읽어서 main view로 이동

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchToMain = (
  selectedBuilding: string | null,
  setSelectedBuilding: (building: string | null) => void,
  setSelectedFloor: (floor: number | null) => void
  // setSelectedCabinet: (cabinetNumber: number | null) => void
) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리스트링에서 building과 floor 값을 읽음
    const buildingFromQuery = searchParams.get("building");
    const floorFromQuery = searchParams.get("floor");
    // const cabinetFromQuery = searchParams.get("cabinetNumber");

    // 쿼리스트링(building, floor)에 값이 있으면 상태를 업데이트
    if (
      !selectedBuilding &&
      buildingFromQuery &&
      floorFromQuery
      // &&
      // cabinetFromQuery
    ) {
      setSelectedBuilding(buildingFromQuery);
      setSelectedFloor(floorFromQuery);
      // setSelectedCabinet(cabinetFromQuery);
    }
  }, [
    searchParams,
    selectedBuilding,
    setSelectedBuilding,
    setSelectedFloor,
    // setSelectedCabinet,
  ]);
};

export default useSearchToMain;
