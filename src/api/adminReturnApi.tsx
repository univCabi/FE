import api from "@/api/axiosInterceptApi";

export const adminReturnApi = async (cabinetId: number[]) => {
  try {
    const response = await api.post("/cabinet/admin/return", {
      cabinetId,
    });

    if (response.status === 200) {
      return {
        message: response.data.message,
        data: response.data,
      };
    }
  } catch (error) {
    throw error;
  }
};
