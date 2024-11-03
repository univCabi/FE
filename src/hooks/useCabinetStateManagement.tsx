// 사물함 대여/반납 상태를 관리하는 hook

import { useState } from "react";

export const useCabinetStateManagement = () => {
  const [isRented, setIsRented] = useState(false); // 대여 여부

  return { isRented, setIsRented };
};
