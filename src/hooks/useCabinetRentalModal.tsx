// 대여 버튼에 대한 모달 hook

import { useState } from "react";

export const useCabinetRentalModal = () => {
  const [openRentalModal, setOpenRentalModal] = useState(false); // 대여 모달

  return {
    openRentalModal,
    setOpenRentalModal,
  };
};
