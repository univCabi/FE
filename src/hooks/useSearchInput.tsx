// search에 대한 hook

import { useState, useEffect } from "react";
import { useBuildingList } from "@/hooks/useBuildingList";

interface Building {
  name: string;
  floors: string[];
}

export const useSearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>([]); // 필터링된 결과 상태
  const { buildings } = useBuildingList(); // 건물 리스트 가져오기

  useEffect(() => {
    // searchInput이 변경될 때마다 필터링된 결과 업데이트
    setFilteredBuildings(
      buildings.filter((building) =>
        building.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, buildings]);

  return {
    searchInput,
    setSearchInput,
    filteredBuildings,
  };
};
