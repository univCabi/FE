import api from "@/api/axiosInterceptApi";

export const userProfileInfoUpdateApi = async (userIsVisible: boolean) => {
  try {
    const response = await api.post("/user/profile/me", {
      isVisible: userIsVisible,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
};
