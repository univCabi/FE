// 유저 정보 조회 Api
import api from "@/api/axiosInterceptApi";

export const userDataApi = async () => {
  try {
    const response = await api.get("/user/profile/me");
    return { status: response.status, data: response.data };
  } catch (error) {
    throw error; // 오류를 발생시켜 useUserData의 catch 블록으로 전달
  }
};
