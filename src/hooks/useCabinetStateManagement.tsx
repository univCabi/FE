// 사물함 대여/반납 상태를 관리하는 hook

import { useState } from "react";

export const useCabinetStateManagement = () => {
  const [isRented, setIsRented] = useState<boolean>(false); // 대여 여부
  const [rentedCabinetId, setRentedCabinetId] = useState<number | null>(null); // 대여된 사물함 ID

  // 상태 초기화 메서드 추가
  const resetState = () => {
    setIsRented(false);
    setRentedCabinetId(null);
  };
  return {
    isRented,
    setIsRented, // 직접 상태를 변경하기 위해 반환
    rentedCabinetId,
    setRentedCabinetId,
    resetState,
  };
};
