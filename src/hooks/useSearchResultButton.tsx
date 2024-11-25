// 검색 결과 버튼 클릭 시 cabinet에 대한 API 요청을 위한 hook

import { useNavigate } from "react-router";
import { cabinetCallApi } from "@/api/cabinetCallApi";

export const useSearchResultButton = () => {
  const navigate = useNavigate();

  // 검색 결과 버튼 클릭 시 사물함 API 호출
  const handleClickResultButton = async (building: string, floor: number) => {
    try {
      const response = await cabinetCallApi(building, floor);
      navigate(`/main?building=${building}&floor=${floor}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleClickResultButton,
  };
};
