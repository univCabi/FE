import api from "@/api/axiosInterceptApi";

export const adminChangeStatusApi = async (
  cabinetId: number,
  newStatus: string,
) => {
  try {
    // TODO: cabinetId -> array 형태로 변경 예정
    const response = await api.post("/cabinet/admin/change/status", {
      cabinetId,
      newStatus,
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
