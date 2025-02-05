// 검색 결과 버튼 누르면 쿼리스트링을 읽어서 main view로 이동
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchToMain = (
  selectedBuilding: string | null,
  setSelectedBuilding: (building: string | null) => void,
  setSelectedFloor: (floor: number | null) => void,
) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리스트링에서 building과 floor 값을 읽음
    const buildingFromQuery = searchParams.get("building");
    const floorFromQuery = searchParams.get("floor"); // -> 쿼리가 숫자여도 string으로 인식

    const floorToNumber = Number(floorFromQuery);

    // 쿼리스트링(building, floor)에 값이 있으면 상태를 업데이트
    if (!selectedBuilding && buildingFromQuery && floorFromQuery) {
      setSelectedBuilding(buildingFromQuery);
      setSelectedFloor(floorToNumber); // 쿼리에서 받아온 값은 문자 따라서 타입 오류 발생생
    }
  }, [searchParams, selectedBuilding, setSelectedBuilding, setSelectedFloor]);
};

export default useSearchToMain;
