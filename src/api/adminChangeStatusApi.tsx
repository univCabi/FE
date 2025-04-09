import api from "@/api/axiosInterceptApi";

export const adminChangeStatusApi = async (
  cabinetIds: number[],
  newStatus: string,
  studentNumber?: string,
  reason?: string,
) => {
  try {
    const response = await api.post("/cabinet/admin/change/status", {
      cabinetIds,
      newStatus,
      studentNumber,
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
