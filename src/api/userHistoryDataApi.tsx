import api from "@/api/axiosInterceptApi";

export const userHistoryDataApi = async () => {
  try {
    const response = await api.get("/cabinet/history");
    return { status: response.status, data: response.data };
  } catch (error) {
    throw error; // 오류를 발생시켜 useUserData의 catch 블록으로 전달
  }
};
