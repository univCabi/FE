import axios from "@/api/axiosCredentialstate";
const CABINET_URL = import.meta.env.VITE_CABINET_URL;

// 메인 페이지: 건물, 층 선택 시 호출되는 API
export const cabinetCallApi = async (building: string, floor: number) => {
  try {
    const response = await axios.get(
      `${CABINET_URL}?building=${building}&floor=${floor}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
