// 사물함 선택, 대여, 반납, color 관련 hook
import { useEffect, useState } from "react";
import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";

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

  const fetchCabinetDetailInformation = async (cabinetId: number) => {
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      setExpiredAt(response.expiredAt); // 만료일 설정
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // 각 상태에 대한 버튼 색상 설정
  const getStatusColor = (selectedStatus: string, isMyCabinet: boolean) => {
    if (selectedStatus === "USING") {
      if (isMyCabinet === true) {
        return "bg-lime-500 text-white"; // 본인이 사용 중인 사물함
      }
      if (isMyCabinet === false) {
        return "bg-purple-500 text-white"; // 다른 사람이 사용 중인 사물함
      }
    }
    switch (selectedStatus) {
      case "OVERDUE":
        return "bg-red-500 text-white"; // 반납 지연
      case "AVAILABLE":
        return "bg-gray-300"; // 이용 가능
      case "BROKEN":
        return "bg-gray-700 text-white"; // 사용 불가
    }
  };

  useEffect(() => {
    if (selectedCabinet === null) return;
    if (selectedCabinet.cabinetId) {
      fetchCabinetDetailInformation(selectedCabinet.cabinetId);
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
    fetchCabinetDetailInformation,
    getStatusColor,
  };
};
