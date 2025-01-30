import api from "@/api/axiosInterceptApi";

export const searchResultsApi = async (searchInput: string, page: number) => {
  try {
    const response = await api.get(
      `/cabinet/search/detail?keyword=${searchInput}&page=${page}`
    );
    if (response && response.data) {
      return response;
    } else {
      throw new Error("응답 데이터가 없습니다.");
    }
  } catch (error) {
    throw error;
  }
};
