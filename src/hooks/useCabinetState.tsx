// 사물함 선택 관련 hook

import { useState } from "react";

export const useCabinetState = () => {
  const [selectedCabinet, setSelectedCabinet] = useState<number | null>(null);

  return {
    selectedCabinet,
    setSelectedCabinet,
  };
};
