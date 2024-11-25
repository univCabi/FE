import api from "@/api/axiosInterceptApi";

export const logoutApi = async () => {
  try {
    const response = await api.post("authn/logout");
    document.cookie = `accessToken=; path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // accessToken 만료로 삭제
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
};
