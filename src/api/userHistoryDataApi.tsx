import axios from "axios";
const HISTORY_DATA_URL = import.meta.env.VITE_BE_URL; // VITE_LOGIN_URL 사용

export const userHistoryDataApi = async () => {
  try {
    const response = await axios.get(`${HISTORY_DATA_URL}/cabinet/history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    throw error; // 오류를 발생시켜 useUserData의 catch 블록으로 전달
  }
};
