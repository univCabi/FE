import axios from "axios";

// // Search API 호출
export const searchKeywordApi = async (keyword) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/cabinet/search/detail?keyword=${keyword}`
    );
    const filterData = response.data.filter((inputValue) => {
      return inputValue.cabinetNumber.toString().includes(keyword);
    });
    return filterData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
