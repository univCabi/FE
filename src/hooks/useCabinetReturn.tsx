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
      if (response?.success) {
        setSelectedStatus(response.data.status);
        setIsMyCabinet(response.data.isMine);
        closeReturnModal();
        setExpiredAt(null); // 반납 기간 초기화
        return response.data;
      } else {
        closeReturnModal();
      }
    } catch (error) {
      closeReturnModal();
    }
  };

  return {
    fetchCabinetReturn,
  };
};
