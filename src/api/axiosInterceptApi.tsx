import axios from "axios";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";
import { log } from "@/utils/logger";

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL, // 모든 api 요청은 기본으로 localhost:8000 으로 보냅니다.
  withCredentials: true, // 모든 api 요청은 withCredentials:true 설정입니다.
});

api.interceptors.request.use(
  (response) => {
    const accessToken = getCookie("accessToken");

    const currentPath = window.location.pathname;
    const isLoginPage =
      currentPath === "/login" || currentPath === "/admin/login";
    if (accessToken) {
      response.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (!accessToken && !isLoginPage) {
      log.error("accessToken이 존재하지 않습니다.");
      window.location.href = "/login";
    }
    return response;
  },
  (error) => {
    log.error(`요청 인터셉터 에러 ${error}`);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const Request = error.config;
    const objectErrorStatus = Number(JSON.stringify(error.response.status));
    const objectErrorTokenClass = JSON.stringify(
      error.response.data.messages[0].token_class,
    );

    if (
      objectErrorStatus === 401 &&
      objectErrorTokenClass === `"AccessToken"`
    ) {
      try {
        const response = await api.post("/authn/token/access");
        const newAccessToken = response.data.accessToken;

        setCookie("accessToken", newAccessToken);
        log.info("accessToken 재발급 성공");
        return api(Request);
      } catch (refreshError) {
        log.warn("refresh 토큰 만료");
        removeCookie("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    } else if (
      objectErrorStatus === 401 &&
      objectErrorTokenClass === `"RefreshToken"`
    ) {
      log.warn("refresh 토큰 만료");
      removeCookie("accessToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }
    if (objectErrorStatus === 500) {
      log.error("서버 에러 500");
      removeCookie("accessToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
