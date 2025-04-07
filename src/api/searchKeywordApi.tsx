import { SearchResult } from "@/types/SearchType";
import api from "@/api/axiosInterceptApi";

export const searchKeywordApi = async (keyword: string) => {
  try {
    const response = await api.get(`/cabinet/search?keyword=${keyword}`);

    const filterData = response.data.filter((inputValue: SearchResult) =>
      inputValue.cabinetNumber?.toString().includes(keyword),
    );
    return filterData;
  } catch (error) {
    return [];
  }
};
