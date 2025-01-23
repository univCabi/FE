import { useEffect, useRef, useState } from "react";
import { BuildingData } from "types/interface";
import buildingData from "@/mocks/buildingData.json";

export const useBuildingState = () => {
  const [buildingList, setBuildingList] =
    useState<BuildingData[]>(buildingData);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null); // 선택한 건물의 인덱스를 저장하는 상태
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null); // 선택한 층수의 인덱스를 저장하는 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // 드롭다운 상태
  const dropdownOutsideRef = useRef<HTMLDivElement | null>(null);

  // 선택된 건물의 인덱스를 변경하는 함수
  const toggleBuilding = (building: string) => {
    setSelectedBuilding(building);
    setSelectedFloor(null);
  };

  // 선택된 층수의 인덱스를 변경하는 함수
  const toggleFloor = (floor: number) => {
    setSelectedFloor(floor);
  };

  // SideNavigationLayout 드롭다운의 외부를 클릭하였을 때 드롭다운 닫음
  const handleClickDropdownOutside = (e: MouseEvent) => {
    if (
      dropdownOutsideRef.current &&
      !dropdownOutsideRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener("click", handleClickDropdownOutside);
    }
    return () =>
      window.removeEventListener("click", handleClickDropdownOutside);
  }, [isDropdownOpen]);

  return {
    buildingList,
    setBuildingList,
    selectedBuilding,
    setSelectedBuilding,
    selectedFloor,
    setSelectedFloor,
    isDropdownOpen,
    setIsDropdownOpen,
    toggleBuilding,
    toggleFloor,
    dropdownOutsideRef,
  };
};
