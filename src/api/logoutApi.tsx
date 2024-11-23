import api from "@/api/axiosInterceptApi";
import { AppDispatch } from "@/redux/store/store";
import { clearAccessToken } from "@/redux/slice/authSlice";

export const logoutApi = async (distpatch: AppDispatch) => {
  try {
    const response = await api.post("authn/logout");
    distpatch(clearAccessToken());
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
};
