// 유저 정보 조회 Api
import axios from "axios";
const DATA_URL = import.meta.env.VITE_BE_URL; // VITE_LOGIN_URL 사용

export const userDataApi = async () => {
  try {
    const response = await axios.get(`${DATA_URL}/user/profile/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    throw error; // 오류를 발생시켜 useUserData의 catch 블록으로 전달
  }
};
