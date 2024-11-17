// 건물 정보인 mock 데이터 받음
import { useState } from "react";
import buildingData from "@/mocks/buildingData.json";

export const useBuildingList = () => {
  const [buildings, setBuildings] = useState(buildingData);

  return {
    buildings,
    setBuildings,
  };
};
