import api from "@/api/axiosInterceptApi";

// 사물함 상세 정보 API 호출
export const cabinetDetailInfoApi = async (cabinetId: number) => {
  try {
    const response = await api.get(`/cabinet/detail?cabinetId=${cabinetId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
