// 검색 결과 버튼 클릭 시 cabinet에 대한 API 요청을 위한 hook
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { cabinetCallApi } from "@/api/cabinetCallApi";
import { log } from "@/utils/logger";

interface filteredCabinetDetailProps {
  building: string;
  floor: number;
}

export const useSearchResultButton = () => {
  const navigate = useNavigate();
  const [filteredCabinetDetail, setFilteredCabinetDetail] =
    useState<filteredCabinetDetailProps | null>(null); // 상세 데이터 저장

  // 검색 결과 버튼 클릭 시 사물함 API 호출
  const fetchClickResultButton = async (
    building: string,
    floor: number,
    keyword?: number,
  ) => {
    try {
      const response = await cabinetCallApi(building, floor);
      // keyword와 cabinetNumber 비교하여 일치하는 데이터 찾기
      const matchedCabinet = response.cabinets.find(
        (cabinet: { cabinetNumber: number }) =>
          cabinet.cabinetNumber === keyword,
      );
      if (matchedCabinet) {
        // 상태 업데이트
        setFilteredCabinetDetail({
          ...matchedCabinet,
          building,
          floor,
        });
      }
      log.info(
        `API 호출 성공: cabinetCallApi, ${JSON.stringify(response, null, 2)}`,
      );
    } catch (error) {
      log.error("API 호출 중 에러 발생: cabinetCallApi");
    }
  };

  // 상태 변경 시 navigate 호출
  useEffect(() => {
    if (filteredCabinetDetail) {
      navigate(
        `/main?building=${filteredCabinetDetail.building}&floor=${filteredCabinetDetail.floor}`,
        {
          state: { filteredCabinetDetail },
        },
      );
    }
  }, [filteredCabinetDetail]);

  return {
    fetchClickResultButton,
    filteredCabinetDetail,
  };
};
