import { useEffect, useState } from "react";
import { SelectedCabinet } from "@/types/CabinetType";
import { log } from "@/utils/logger";
import { returnApi } from "@/api/returnApi";

interface UseCabinetReturnProps {
  selectedCabinet: SelectedCabinet | null;
  closeReturnModal: () => void;
  setSelectedStatus: (status: string) => void;
  setExpiredAt: (expiredAt: string | null) => void;
  setIsMyCabinet: (isMine: boolean) => void;
  setUsername: (username: string | null) => void;
  setIsRentAvailable: (isRentAvailable: boolean) => void;
}

export const useCabinetReturn = ({
  selectedCabinet,
  closeReturnModal,
  setSelectedStatus,
  setExpiredAt,
  setIsMyCabinet,
  setUsername,
  setIsRentAvailable,
}: UseCabinetReturnProps) => {
  // 반납 후 5분 이내 기록을 저장할 상태
  const [cabinetReturnTimes, setCabinetReturnTimes] = useState<{
    [key: number]: number;
  }>({});

  const fetchCabinetReturn = async () => {
    if (!selectedCabinet) return;
    try {
      const response = await returnApi(selectedCabinet.cabinetId);

      if (response) {
        setSelectedStatus(response.data.status);
        setIsMyCabinet(response.data.isMine);
        setIsRentAvailable(response.data.isRentAvailable);
        setUsername(null);
        setExpiredAt(null);
        closeReturnModal();
        log.info(
          `API 호출 성공: returnApi, ${JSON.stringify(response, null, 2)}`,
        );
        return response.data;
      } else {
        closeReturnModal();
      }
    } catch (error) {
      log.error("API 호출 중 에러 발생: returnApi");
      closeReturnModal();
    }
  };

  return {
    fetchCabinetReturn,
    cabinetReturnTimes,
    setCabinetReturnTimes,
  };
};
