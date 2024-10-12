// 반납 버튼에 대한 모달 hook -> 대여 hook이랑 합치면 안되낭?

import { useState } from "react";

export const useCabinetReturnModal = () => {
  const [openReturnModal, setOpenReturnModal] = useState(false); // 대여 모달

  return { openReturnModal, setOpenReturnModal };
};
