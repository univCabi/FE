// 대여 버튼에 대한 모달 hook

import { useState } from "react";

export const useCabinetRentalModal = () => {
  const [openModal, setOpenModal] = useState(false); // 대여 모달
  const [isRented, setIsRented] = useState(false); // 대여 여부

  return { openModal, setOpenModal, isRented, setIsRented };
};
