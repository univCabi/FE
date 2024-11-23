import axios from "@/api/axiosCredentialstate";
const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;

// // Search API 호출
export const searchKeywordApi = async (keyword) => {
  try {
    const response = await axios.get(`${SEARCH_URL}?keyword=${keyword}`);

    const filterData = response.data.filter((inputValue) => {
      return inputValue.cabinetNumber.toString().includes(keyword);
    });
    return filterData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
