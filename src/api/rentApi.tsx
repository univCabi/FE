// 사물함 대여 API

import axios from "axios";

export const rentApi = async (cabinetId: number) => {
  const token = localStorage.getItem("accessToken"); // 확인용 -> 추후 제거
  if (!token) {
    console.error("Access token is missing.");
    return { success: false, message: "Token is missing" };
  }

  try {
    const response = await axios.post(
      `http://localhost:8000/cabinet/rent`,
      { cabinetId }, // 요청 데이터
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Cabinet rent successful:", response.data);
      return { success: true, message: "Rent successful", data: response.data };
    }
  } catch (error: any) {
    if (error) {
      if (error === 400) {
        console.error("Cabinet is already rented");
        return { success: false, message: "Cabinet is already rented" };
      }

      if (error === 404) {
        console.error("Cabinet not found");
        return { success: false, message: "Cabinet not found" };
      }
    }
    console.error("Unexpected error:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
};
