
import api from "@/api/axiosInterceptApi";

export const searchResultsApi = async (searchInput: string, page: number) => {
  try {
    const response = await api.get(
      `/cabinet/search/detail?keyword=${searchInput}&page=${page}`
    );
    if (response && response.data) {
      return response; // 정상 응답 반환
    } else {
      throw new Error("응답 데이터가 없습니다."); // 데이터가 없을 경우 예외 처리
    }
  } catch (error) {
    console.error(error);
    throw error; // 호출한 함수에서 처리할 수 있도록 에러 전달
  }
};
