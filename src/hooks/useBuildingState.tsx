import { useEffect, useRef, useState } from "react";

export const useBuildingState = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null); // 선택한 건물의 인덱스를 저장하는 상태
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null); // 선택한 층수의 인덱스를 저장하는 상태
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태

  // 선택된 건물의 인덱스를 변경하는 함수
  const toggleBuilding = (buildingName: string) => {
    setSelectedBuilding(buildingName);
    setSelectedFloor(null);
    setIsOpen(false);
  };

  // 선택된 층수의 인덱스를 변경하는 함수
  const toggleFloor = (floorIndex: number) => {
    setSelectedFloor(floorIndex);
  };

  // SideNavigationLayout 드롭다운의 외부를 클릭하였을 때 드롭다운 닫음
  const dropdownOutsideRef = useRef<HTMLDivElement | null>(null);
  const handleClickedDropdownOutside = (e: MouseEvent) => {
    if (
      dropdownOutsideRef.current &&
      !dropdownOutsideRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickedDropdownOutside);
    }
    return () =>
      window.removeEventListener("click", handleClickedDropdownOutside);
  }, [isOpen]);

  return {
    selectedBuilding,
    setSelectedBuilding,
    selectedFloor,
    setSelectedFloor,
    isOpen,
    setIsOpen,
    toggleBuilding,
    toggleFloor,
    dropdownOutsideRef,
  };
};
