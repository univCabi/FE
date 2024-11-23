// /search/detail 호출

import axios from "axios";
const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;

export const searchResultsApi = async (searchInput: string, page: number) => {
  const token = localStorage.getItem("accessToken"); // 확인용 -> 추후 제거
  if (!token) {
    console.log("You need to log in first.");
    return;
  }
  try {
    const response = await axios.get(
      `${SEARCH_URL}/detail?keyword=${searchInput}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
