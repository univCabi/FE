// 모든 confirm 모달의 확인과 취소를 관리하는 훅
import { useState } from "react";

export const useConfirmModalState = () => {
  const [openRentalModal, setOpenRentalModal] = useState(false); // 대여 모달
  const [openReturnModal, setOpenReturnModal] = useState(false); // 반납 모달
  const [openProfileSaveButtonModal, setOpenProfileSaveButtonModal] =
    useState(false); // 프로필 저장 버튼 모달
  return {
    openRentalModal,
    setOpenRentalModal,
    openReturnModal,
    setOpenReturnModal,
    openProfileSaveButtonModal,
    setOpenProfileSaveButtonModal,
  };
};
