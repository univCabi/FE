import axios from "@/api/axiosInterceptApi";

// 나중에 주희님 타입으로 고쳐야함
const CabinetStatus = {
  AVAILABLE: "AVAILABLE",
  USING: "USING",
  BROKEN: "BROKEN",
  OVERDUE: "OVERDUE",
} as const;
// 이것도
export type CabinetStatusType =
  (typeof CabinetStatus)[keyof typeof CabinetStatus];
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
