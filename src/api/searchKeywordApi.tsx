// Search API 호출

import axios from "axios";
const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;

import api from "@/api/axiosInterceptApi";

// // Search API 호출
export const searchKeywordApi = async (keyword) => {
  try {
    const response = await api.get(`/cabinet/search?keyword=${keyword}`);

    const filterData = response.data.filter((inputValue) =>
      inputValue.cabinetNumber?.toString().includes(keyword)
    );
    return filterData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
