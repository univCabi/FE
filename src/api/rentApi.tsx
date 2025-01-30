import api from "@/api/axiosInterceptApi";

export const rentApi = async (cabinetId: number) => {
  try {
    const response = await api.post("/cabinet/rent", { cabinetId });

    if (response.status === 200) {
      return { message: "대여 성공", data: response.data };
    }
  } catch (error) {
    throw error;
  }
};
