import axios from "axios";
import store from "@/redux/store/store";
import { setAccessToken, clearAccessToken } from "@/redux/slice/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL, // 모든 api 요청은 기본으로 localhost:8000 으로 보냅니다.
  withCredentials: true, // 모든 api 요청은 withCredentials:true 설정입니다.
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const Request = error.config;
    if (error.response.status === 401 && !Request._retry) {
      Request._retry = true; // 무한 반복 막기
      try {
        const response = await api.post("/authn/token/access");
        const newAccessToken = response.data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));
        return api(Request);
      } catch (refreshError) {
        console.error("refresh 토큰 만료", refreshError);
        store.dispatch(clearAccessToken());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    if (error.response.status === 500) {
      console.error("500에러", error);
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
