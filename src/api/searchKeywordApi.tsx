
// Search API 호출

import api from "@/api/axiosInterceptApi";

export const searchKeywordApi = async (keyword) => {

  try {
    const response = await api.get(`/cabinet/search?keyword=${keyword}`);

    // 응답 데이터 검증 및 필터링
    const filterData = response.data.filter((inputValue) =>
      inputValue.cabinetNumber.toString().includes(keyword)
    );
    return filterData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
