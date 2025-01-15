import { useEffect } from "react";
import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";

interface UseCabinetDetailDataProps {
  cabinetData: Array<{
    id: number;
    cabinetNumber: number;
    cabinetXPos: number;
    cabinetYPos: number;
    status: string;
    isMine: boolean;
  }>;
  filteredCabinetDetail: {
    id: number;
    status: string;
    isMine: boolean;
    cabinetNumber: number;
  } | null;
  setSelectedCabinet: (
    cabinet: { cabinetId: number; cabinetNumber: number } | null
  ) => void;
  setSelectedStatus: (status: string) => void;
  setIsMyCabinet: (isMine: boolean) => void;
}

export const useCabinetDetailData = ({
  cabinetData,
  filteredCabinetDetail,
  setSelectedCabinet,
  setSelectedStatus,
  setIsMyCabinet,
}: UseCabinetDetailDataProps) => {
  const fetchCabinetDetailInformation = async (
    cabinetId: number,
    cabinetNumber: number
  ) => {
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      setSelectedCabinet({ cabinetId, cabinetNumber });
      setSelectedStatus(response.status);
      setIsMyCabinet(response.isMine);
      console.log(200);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (filteredCabinetDetail) {
      const matchedCabinet = cabinetData.find(
        (cabinet) =>
          cabinet.cabinetNumber === filteredCabinetDetail.cabinetNumber
      );
      if (matchedCabinet) {
        fetchCabinetDetailInformation(
          matchedCabinet.id,
          matchedCabinet.cabinetNumber
        );
      }
    }
  }, [cabinetData, filteredCabinetDetail]);

  return { fetchCabinetDetailInformation };
};
