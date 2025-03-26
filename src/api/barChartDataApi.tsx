import axios from "@/api/axiosInterceptApi";

// Admin 메인 페이지 : barChart에 필요한 데이터 호출 API
export const barChartDataApi = async () => {
  try {
    const response = await axios.get("/cabinet/admin/dashboard");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
