import api from "@/api/axiosInterceptApi";

export const logoutApi = async () => {
  try {
    const response = await api.post("authn/logout");
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
};
