// Search API 호출

import axios from "axios";
const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;

import api from "@/api/axiosInterceptApi";

export const searchKeywordApi = async (keyword) => {
  const token = localStorage.getItem("accessToken"); // 확인용 -> 추후 제거
  if (!token) {
    console.error("Access token not found. Redirecting to login.");
    return [];
  }

  try {
    const response = await api.get(`/cabinet/search?keyword=${keyword}`);

    console.log(response.data);

    // 응답 데이터 검증 및 필터링
    const filterData = response.data.filter((inputValue) =>
      inputValue.cabinetNumber?.toString().includes(keyword)
    );
    return filterData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
