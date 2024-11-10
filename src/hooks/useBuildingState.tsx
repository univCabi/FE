import { useEffect, useRef, useState } from "react";

export const useBuildingState = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null); // 선택한 건물의 인덱스를 저장하는 상태
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null); // 선택한 층수의 인덱스를 저장하는 상태
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태

  // 선택된 건물의 인덱스를 변경하는 함수
  const toggleBuilding = (index: number) => {
    setSelectedBuilding(index);
    setSelectedFloor(null);
    setIsOpen(false);
  };

  // 선택된 층수의 인덱스를 변경하는 함수
  const toggleFloor = (floorIndex: number) => {
    setSelectedFloor(floorIndex);
  };

  return {
    selectedBuilding,
    setSelectedBuilding,
    selectedFloor,
    setSelectedFloor,
    isOpen,
    setIsOpen,
    toggleBuilding,
    toggleFloor,
  };
};
