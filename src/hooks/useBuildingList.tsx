// 건물 정보인 mock 데이터 받음
import { useState } from "react";
import buildingData from "@/mocks/buildingData.json";

export const useBuildingList = () => {
  const [buildingList, setBuildingList] = useState(buildingData);

  return {
    buildingList,
    setBuildingList,
  };
};
