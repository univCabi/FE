// Admin Return API 호출
import { MultiCabinet, SelectedMultiCabinetsData } from "@/types/AdminType";
import { SelectedCabinet } from "@/types/CabinetType";
import { log } from "@/utils/logger";
import { adminReturnApi } from "@/api/adminReturnApi";

interface AdminReturnProps extends MultiCabinet {
  closeReturnModal: () => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCabinet: SelectedCabinet | null;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  setSelectedMultiCabinets: React.Dispatch<
    React.SetStateAction<SelectedMultiCabinetsData[] | null>
  >;
}

export const useAdminReturn = ({
  selectedMultiCabinets,
  closeReturnModal,
  setSelectedStatus,
  isMultiButtonActive,
  selectedCabinet,
  setSelectedCabinet,
  setSelectedMultiCabinets,
}: AdminReturnProps) => {
  const fetchAdminCabinetReturn = async () => {
    const cabinetIds: number[] = isMultiButtonActive
      ? (selectedMultiCabinets?.map((cabinet) => cabinet.id) ?? [])
      : selectedCabinet
        ? [selectedCabinet.cabinetId]
        : [];
    try {
      const response = await adminReturnApi(cabinetIds);
      if (response) {
        setSelectedStatus(response.data.cabinets.status);
        setSelectedMultiCabinets(null);
        setSelectedCabinet(null);
        closeReturnModal();
        log.info(
          `API 호출 성공: returnApi, ${JSON.stringify(response, null, 2)}`,
        );
        return response.data;
      } else {
        closeReturnModal();
      }
    } catch (error) {
      log.error("API 호출 중 에러 발생: adminReturnApi");
      closeReturnModal();
    }
  };

  return {
    fetchAdminCabinetReturn,
  };
};
