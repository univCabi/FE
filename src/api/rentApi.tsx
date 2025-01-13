import api from "@/api/axiosInterceptApi";

export const rentApi = async (cabinetId: number) => {
  try {
    const response = await api.post(
      `http://localhost:8000/cabinet/rent`,
      { cabinetId } // 요청 데이터
    );

    if (response.status === 200) {
      console.log(response.status, response.data);
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
