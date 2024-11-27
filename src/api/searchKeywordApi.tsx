// Search API 호출

import api from "@/api/axiosInterceptApi";

export const searchKeywordApi = async (keyword) => {
  try {
    const response = await api.get(`/cabinet/search?keyword=${keyword}`);

    const filterData = response.data.filter((inputValue) =>
      inputValue.cabinetNumber?.toString().includes(keyword)
    );
    return filterData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
