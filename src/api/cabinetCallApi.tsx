import axios from "axios";
const CABINET_URL = import.meta.env.VITE_CABINET_URL;

// 메인 페이지: 건물, 층 선택 시 호출되는 API
export const cabinetCallApi = async (building: string, floor: number) => {
  const token = localStorage.getItem("accessToken"); // 확인용 -> 추후 제거
  if (!token) {
    console.log("토큰이 없습니다.");
    return;
  }
  try {
    const response = await axios.get(
      `${CABINET_URL}?building=${building}&floor=${floor}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error === 404) {
      console.log("Building with the specified name and floor not found.");
    }
  }
};
