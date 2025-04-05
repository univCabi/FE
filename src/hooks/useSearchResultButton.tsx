// 검색 결과 버튼 클릭 시 cabinet에 대한 API 요청을 위한 hook
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { log } from "@/utils/logger";
import { cabinetCallApi } from "@/api/cabinetCallApi";

interface filteredCabinetDetailProps {
  building: string;
  floor: number;
  cabinetNumber: number;
}

export const useSearchResultButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      if (response) {
        const matchedCabinet = response.find(
          (cabinet: { cabinetNumber: number }) =>
            cabinet.cabinetNumber === keyword,
        );

        if (matchedCabinet) {
          setFilteredCabinetDetail({
            ...matchedCabinet,
            building,
            floor,
          });
        }
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
      const basePath = location.pathname.startsWith("/admin")
        ? "/admin/main"
        : "/main";
      const searchResultPath = `${basePath}?building=${filteredCabinetDetail.building}&floors=${filteredCabinetDetail.floor}`;
      navigate(searchResultPath, { state: { filteredCabinetDetail } });
    }
    console.log(filteredCabinetDetail);
  }, [filteredCabinetDetail]);

  return {
    fetchClickResultButton,
    filteredCabinetDetail,
  };
};
