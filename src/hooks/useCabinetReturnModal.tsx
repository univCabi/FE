// 반납 버튼에 대한 모달 hook

import { useState } from "react";

export const useCabinetReturnModal = () => {
  const [openReturnModal, setOpenReturnModal] = useState(false); // 반납 모달

  return { openReturnModal, setOpenReturnModal };
};
