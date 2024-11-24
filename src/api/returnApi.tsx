import axios from "axios";

export const returnApi = async (cabinetId: number) => {
  const token = localStorage.getItem("accessToken"); // 확인용 -> 추후 제거
  if (!token) {
    console.error("Access token is missing.");
    return { success: false, message: "Token is missing" };
  }

  try {
    const response = await axios.post(
      `http://localhost:8000/cabinet/return`,
      { cabinetId }, // 요청 데이터
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Cabinet Return Successful:", cabinetId);
      return {
        success: true,
        message: "Cabinet Return Successful",
        data: response.data,
      };
    }
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        console.error("Cabinet is not rented:", data);
        return { success: false, message: "Cabinet is not rented" };
      }

      if (status === 404) {
        console.error("Cabinet not found:", data);
        return { success: false, message: "Cabinet not found" };
      }
    }

    console.error("Unexpected error:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
};
