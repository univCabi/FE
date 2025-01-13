// 검색 결과 버튼 클릭 시 cabinet에 대한 API 요청을 위한 hook

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { cabinetCallApi } from "@/api/cabinetCallApi";
import { cabinetDetailInfoApi } from "@/api/cabinetDetailInfoApi";
import { useSearch } from "@/hooks/useSearch";

export const useSearchResultButton = () => {
  const navigate = useNavigate();
  const [filteredCabinetDetail, setFilteredCabinetDetail] = useState(null); // 상세 데이터 저장
  const { setSearchParams } = useSearch();

  // 검색 결과 버튼 클릭 시 사물함 API 호출
  const fetchClickResultButton = async (
    building: string,
    floor: number,
    keyword?: number
  ) => {
    try {
      const response = await cabinetCallApi(building, floor);
      // keyword와 cabinetNumber 비교하여 일치하는 데이터 찾기
      const matchedCabinet = response.cabinets.find(
        (cabinet) => cabinet.cabinetNumber === keyword
      );
      if (matchedCabinet) {
        // 상세 정보 API 호출
        const cabinetDetail = await cabinetDetailInfoApi(matchedCabinet.id);
        // 상태 업데이트
        setFilteredCabinetDetail({
          ...cabinetDetail,
          building,
          floor,
        });
        console.log(200);
      } else {
      }
    } catch (error) {
      console.error("Error fetching cabinet details:", error);
    }
  };
  // 수정 필요
  const fetchSearchResultCabinetData = async (
    building: string,
    floor: number
  ) => {
    try {
      const response = await cabinetCallApi(building, floor);
      setSearchParams({ building, floor: floor.toString() }); // 쿼리스트링
      console.log(200);

      return response.data;
    } catch (error) {
      if (error === 404) {
        console.error(404);
      }
    }
  };

  // 상태 변경 시 navigate 호출
  useEffect(() => {
    if (filteredCabinetDetail) {
      navigate(
        `/main?building=${filteredCabinetDetail.building}&floor=${filteredCabinetDetail.floor}`,
        {
          state: { filteredCabinetDetail },
        }
      );
    }
  }, [filteredCabinetDetail, navigate]);

  return {
    fetchClickResultButton,
    filteredCabinetDetail,
    fetchSearchResultCabinetData,
  };
};
