// 모든 confirm 모달의 확인과 취소를 관리하는 훅
import { useState } from "react";

export const useConfirnModalState = () => {
  const [openRentalModal, setOpenRentalModal] = useState(false); // 대여 모달
  const [openReturnModal, setOpenReturnModal] = useState(false); // 반납 모달
  return {
    openRentalModal,
    setOpenRentalModal,
    openReturnModal,
    setOpenReturnModal,
  };
};
