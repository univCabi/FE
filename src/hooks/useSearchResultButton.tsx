// 검색 결과 버튼 클릭 시 cabinet에 대한 API 요청을 위한 hook

import { useNavigate } from "react-router";
import { cabinetCallApi } from "@/api/cabinetCallApi";

export const useSearchResultButton = () => {
  const navigate = useNavigate();

  const handleClickResultButton = async (building, floor) => {
    try {
      const response = await cabinetCallApi(building, floor);
      navigate(`/main?building=${building}&floor=${floor}`); // 선택한 사물함 페이지로 이동
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleClickResultButton,
  };
};
