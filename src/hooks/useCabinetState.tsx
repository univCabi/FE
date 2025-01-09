// 사물함 선택, 대여, 반납 관련 hook

import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useEffect, useState } from "react";

interface SelectedCabinetProps {
  cabinetId: number;
  cabinetNumber: number;
}

export const useCabinetState = () => {
  const [selectedCabinet, setSelectedCabinet] =
    useState<SelectedCabinetProps | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(); // 사물함 status
  const [expiredAt, setExpiredAt] = useState<string | null>(null); // 반납 기한
  const [isMyCabinet, setIsMyCabinet] = useState<boolean>(); // 본인 사물함 여부

  const fetchCabinetDetailInfomation = async (cabinetId: number) => {
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      // setIsMyCabinet(response.isMine); // 사용 여부 설정
      // setSelectedStatus(response.status); // 상태 설정
      setExpiredAt(response.expiredAt); // 만료일 설정
      // console.log("fetch 후 상태 업데이트-isMine:", response.isMine);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCabinet === null) return;
    if (selectedCabinet.cabinetId) {
      fetchCabinetDetailInfomation(selectedCabinet.cabinetId);
      // console.log("hook에서 실행", isMyCabinet, selectedStatus);
    }
  }, [isMyCabinet, selectedStatus, selectedCabinet]);

  return {
    selectedCabinet,
    setSelectedCabinet,
    selectedStatus,
    setSelectedStatus,
    expiredAt,
    setExpiredAt,
    isMyCabinet,
    setIsMyCabinet,
    fetchCabinetDetailInfomation,
  };
};
