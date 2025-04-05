import api from "@/api/axiosInterceptApi";

export const rentApi = async (cabinetId: number) => {
  try {
    const response = await api.post("/cabinet/rent", { cabinetId });
    return { status: response.status, data: response.data };
  } catch (error) {
    throw error;
  }
};
