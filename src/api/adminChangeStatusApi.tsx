import api from "@/api/axiosInterceptApi";

export const adminChangeStatusApi = async (
  cabinetId: number[],
  newStatus: string,
  reason: string | null,
) => {
  try {
    const response = await api.post("/cabinet/admin/change/status", {
      cabinetId,
      newStatus,
      reason,
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
