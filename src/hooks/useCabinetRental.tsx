import { rentApi } from "@/api/rentApi";

interface UseCabinetRentalProps {
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
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
      if (response?.success) {
        setSelectedStatus(response.data.status);
        setExpiredAt(response.data.expiredAt);
        setIsMyCabinet(response.data.isMine);
      }
    } catch (error) {
      console.error(error);
    } finally {
      closeRentalModal();
    }
  };

  return {
    closeRentalModal,
    fetchCabinetRental,
  };
};
