// search에 대한 hook

import { useState, useEffect } from "react";
import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearchParams } from "react-router-dom";

// interface BuildingProps {
//   name: string;
//   floors: number[];
//   no: number[];
// }

export const useSearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  // const [filteredBuildings, setFilteredBuildings] = useState<BuildingProps[]>(
  //   []
  // ); // 필터링된 결과 상태
  const [searchParams, setSearchParams] = useSearchParams(); // searchInput 값에 대한 쿼리스트링

  // const { buildings } = useBuildingList(); // 건물 리스트 가져오기

  // useEffect(() => {
  //   if (searchInput) {
  //     const searchNumber = parseInt(searchInput, 10);

  //     setFilteredBuildings(
  //       buildings.filter((building) => building.no.includes(searchNumber))
  //     );
  //   } else {
  //     setFilteredBuildings(buildings);
  //   }
  // }, [searchInput, buildings]);

  return {
    searchInput,
    setSearchInput,
    // filteredBuildings,
    searchParams,
    setSearchParams,
  };
};
