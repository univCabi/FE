import { log } from "@/utils/logger";
import { returnApi } from "@/api/returnApi";

interface UseCabinetReturnProps {
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
  closeReturnModal: () => void;
  setSelectedStatus: (status: string) => void;
  setExpiredAt: (expiredAt: string | null) => void;
  setIsMyCabinet: (isMine: boolean) => void;
}

export const useCabinetReturn = ({
  selectedCabinet,
  closeReturnModal,
  setSelectedStatus,
  setExpiredAt,
  setIsMyCabinet,
}: UseCabinetReturnProps) => {
  const fetchCabinetReturn = async () => {
    if (!selectedCabinet) return;
    try {
      const response = await returnApi(selectedCabinet.cabinetId);
      if (response) {
        setSelectedStatus(response.data.status);
        setIsMyCabinet(response.data.isMine);
        closeReturnModal();
        setExpiredAt(null); // 반납 기간 초기화
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
  };
};
