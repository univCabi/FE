import { SelectedCabinet } from "@/types/CabinetType";
import { log } from "@/utils/logger";
import { rentApi } from "@/api/rentApi";

interface UseCabinetRentalProps {
  selectedCabinet: SelectedCabinet | null;
  closeRentalModal: () => void;
  setSelectedStatus: (status: string) => void;
  setExpiredAt: (expiredAt: string | null) => void;
  setIsMyCabinet: (isMine: boolean) => void;
}

export const useCabinetRental = ({
  selectedCabinet,
  closeRentalModal,
  setSelectedStatus,
  setExpiredAt,
  setIsMyCabinet,
}: UseCabinetRentalProps) => {
  const fetchCabinetRental = async () => {
    if (!selectedCabinet) return;
    try {
      const response = await rentApi(selectedCabinet.cabinetId);
      if (response) {
        setSelectedStatus(response.data.status);
        setExpiredAt(response.data.expiredAt);
        setIsMyCabinet(response.data.isMine);
        closeRentalModal();
      }
      log.info(`API 호출 성공: rentApi, ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      log.error("API 호출 중 에러 발생: rentApi");
    }
  };

  return {
    fetchCabinetRental,
  };
};
