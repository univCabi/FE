import api from "@/api/axiosInterceptApi";

export const userHistoryDataApi = async (page: number, pageSize: number) => {
  try {
    const response = await api.get("/cabinet/history", {
      params: { page, pageSize },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log("HistoryDataApi 호출 중 오류", error);
    throw error; // 오류를 발생시켜 useUserData의 catch 블록으로 전달
  }
};
