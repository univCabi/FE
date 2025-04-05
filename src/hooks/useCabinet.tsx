import { useRef, useState } from "react";
import { SelectedCabinet } from "@/types/CabinetType";
import { log } from "@/utils/logger";
import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";

export const useCabinet = () => {
  const [selectedCabinet, setSelectedCabinet] =
    useState<SelectedCabinet | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // 사물함 status
  const [expiredAt, setExpiredAt] = useState<string | null>(null); // 반납 기한
  const [isMyCabinet, setIsMyCabinet] = useState<boolean>(false); // 본인 사물함 여부
  const [username, setUsername] = useState<string | null>(null);
  const [isRentAvailable, setIsRentAvailable] = useState<boolean>(false);
  const prevCabinetNumberRef = useRef<number | null>(null);

  // 사물함 세부 정보 API 호출
  const fetchCabinetDetailInformation = async (
    cabinetId: number,
    cabinetNumber: number,
  ) => {
    if (selectedCabinet !== null) {
      if (prevCabinetNumberRef.current === cabinetNumber) return;
    }
    try {
      const response = await cabinetDetailInfoApi(cabinetId);
      prevCabinetNumberRef.current = cabinetNumber;
      setSelectedCabinet({ cabinetId, cabinetNumber });
      setSelectedStatus(response.status);
      setIsMyCabinet(response.isMine);
      setUsername(response.username);
      setExpiredAt(response.expiredAt);
      setIsRentAvailable(response.isRentAvailable);
      log.info(
        `API 호출 성공: cabinetDetailInfoApi, ${JSON.stringify(
          response,
          null,
          2,
        )}`,
      );
      return response;
    } catch (error) {
      log.error("API 호출 중 에러 발생: cabinetDetailInfoApi");
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

  return {
    selectedCabinet,
    setSelectedCabinet,
    selectedStatus,
    setSelectedStatus,
    expiredAt,
    setExpiredAt,
    isMyCabinet,
    setIsMyCabinet,
    getStatusColor,
    fetchCabinetDetailInformation,
    username,
    setUsername,
    prevCabinetNumberRef,
    isRentAvailable,
    setIsRentAvailable,
  };
};
