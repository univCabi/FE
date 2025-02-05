import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL, // 모든 api 요청은 기본으로 localhost:8000 으로 보냅니다.
  withCredentials: true, // 모든 api 요청은 withCredentials:true 설정입니다.
});

api.interceptors.request.use(
  (response) => {
    const accessToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="))
      ?.split("=")[1];
    if (accessToken) {
      response.headers.Authorization = `Bearer ${accessToken}`;
    }
    return response;
  },
  (error) => {
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
        document.cookie = `accessToken=${newAccessToken}; path=/; Secure; SameSite=Strict`;
        return api(Request);
      } catch (refreshError) {
        console.error("refresh 토큰 만료", refreshError);
        document.cookie = `accessToken=; path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // accessToken 만료로 삭제
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    } else if (
      objectErrorStatus === 401 &&
      objectErrorTokenClass === `"RefreshToken"`
    ) {
      console.error("refresh 토큰 만료", error);
      document.cookie = `accessToken=; path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // accessToken 만료로 삭제
      window.location.href = "/login";
      return Promise.reject(error);
    }
    if (objectErrorStatus === 500) {
      console.error("500에러", error);
      document.cookie = `accessToken=; path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // accessToken 만료로 삭제
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
