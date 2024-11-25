// 사물함 선택, 대여, 반납 관련 hook

import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useEffect, useState } from "react";

interface SelectedCabinet {
  cabinetId: number | null;
  cabinetNumber: number | null;
}

export const useCabinetState = () => {
  const [selectedCabinet, setSelectedCabinet] =
    useState<SelectedCabinet | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // 사물함 status
  const [expiredAt, setExpiredAt] = useState<string | null>(null); // 반납 기한
  const [isMine, setIsMine] = useState<boolean | null>(null); // 본인 여부

  return {
    selectedCabinet,
    setSelectedCabinet,
    selectedStatus,
    setSelectedStatus,
    expiredAt,
    setExpiredAt,
    isMine,
    setIsMine,
  };
};
