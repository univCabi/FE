// 대여 버튼에 대한 모달 hook

import { useState } from "react";

export const useCabinetRentalModal = () => {
  const [openRentalModal, setOpenRentalModal] = useState(false);

  const clickedRentalButton = () => {
    setOpenRentalModal(true);
  };
  const closeRentalModal = () => {
    setOpenRentalModal(false);
  };

  return {
    openRentalModal,
    setOpenRentalModal,
    clickedRentalButton,
    closeRentalModal,
  };
};
