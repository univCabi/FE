// 사물함 선택 관련 hook

import { useState } from "react";

export const useCabinetState = () => {
  const [selectedCabinet, setSelectedCabinet] = useState<number | null>(null); // cabinetNumber 관리 - UI용
  // const [cabinetId, setCabinetId] = useState<number | null>(null); // cabinetId 관리 - 고유 사물함 ID

  // const [selectedCabinet, setSelectedCabinet] = useState<{
  //   cabinetId: number | null;
  //   cabinetNumber: number | null;
  // }>({ cabinetId: null, cabinetNumber: null });
  return {
    selectedCabinet,
    setSelectedCabinet,
    // cabinetId,
    // setCabinetId,
  };
};
