import { CabinetStatusType } from "@/types/StatusEnum";
import axios from "@/api/axiosInterceptApi";

export const adminCabinetStatusListApi = async (
  status: CabinetStatusType,
  page: number,
  pageSize: number,
) => {
  try {
    const response = await axios.get("/cabinet/status/search", {
      params: { status, page, pageSize },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
