import axios from "axios";
const CABINET_URL = import.meta.env.VITE_CABINET_URL;

// 사물함 상세 정보 API 호출
export const cabinetDetailInfoApi = async (cabinetId: number) => {
  const token = localStorage.getItem("accessToken"); // 확인용 -> 추후 제거
  if (!token) {
    console.log("토큰이 없습니다.");
    return;
  }
  try {
    const response = await axios.get(
      `${CABINET_URL}/detail?cabinetId=${cabinetId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
