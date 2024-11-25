import api from "@/api/axiosInterceptApi";

// 메인 페이지: 건물, 층 선택 시 호출되는 API
export const cabinetCallApi = async (building: string, floor: number) => {
  try {
    const response = await api.get(
      `/cabient?building=${building}&floor=${floor}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
