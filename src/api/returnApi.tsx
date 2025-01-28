import api from "@/api/axiosInterceptApi";

export const returnApi = async (cabinetId: number) => {
  try {
    const response = await api.post("/cabinet/return", { cabinetId });

    if (response.status === 200) {
      return {
        success: true,
        message: "반납 성공",
        data: response.data,
      };
    }
  } catch (error) {
    throw error;
  }
};
