import { SelectedCabinet } from "@/types/CabinetType";
import { log } from "@/utils/logger";
import { rentApi } from "@/api/rentApi";

interface UseCabinetRentalProps {
  selectedCabinet: SelectedCabinet | null;
  closeRentalModal: () => void;
  setSelectedStatus: (status: string) => void;
  setExpiredAt: (expiredAt: string | null) => void;
  setIsMyCabinet: (isMine: boolean) => void;
  setUsername: (username: string | null) => void;
  isRentAvailable: boolean;
  setIsRentAvailable: (isRentAvailable: boolean) => void;
}
export const useCabinetRental = ({
  selectedCabinet,
  closeRentalModal,
  setSelectedStatus,
  setExpiredAt,
  setIsMyCabinet,
  setUsername,
  isRentAvailable,
  setIsRentAvailable,
}: UseCabinetRentalProps) => {
  const fetchCabinetRental = async () => {
    if (!selectedCabinet) return;
    if (isRentAvailable === false) {
      return;
    } else {
      try {
        const response = await rentApi(selectedCabinet.cabinetId);
        if (response) {
          setSelectedStatus(response.data.status);
          setExpiredAt(response.data.expiredAt);
          setIsMyCabinet(response.data.isMine);
          setUsername(response.data.username);
          setIsRentAvailable(response.data.isRentAvailable);
          closeRentalModal();
        }
        log.info(
          `API 호출 성공: rentApi, ${JSON.stringify(response, null, 2)}`,
        );
      } catch (error) {
        log.error(`API 호출 중 에러 발생: rentApi ${error}`);
        alert("현재 대여 중인 사물함이 있습니다.");
        closeRentalModal();
      }
    }
  };
  return {
    fetchCabinetRental,
  };
};
