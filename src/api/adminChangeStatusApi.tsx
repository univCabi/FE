import { BrokenReasonType, CabinetStatus } from "@/types/StatusEnum";
import api from "@/api/axiosInterceptApi";

// 상태별로 타입 분기
type AdminChangeStatusParams =
  | {
      cabinetIds: number[];
      newStatus: typeof CabinetStatus.BROKEN;
      reason: BrokenReasonType;
      studentNumber?: string;
    }
  | {
      cabinetIds: number[];
      newStatus: typeof CabinetStatus.USING | typeof CabinetStatus.OVERDUE;
      reason?: BrokenReasonType;
      studentNumber: string;
    }
  | {
      cabinetIds: number[];
      newStatus: typeof CabinetStatus.AVAILABLE;
      reason?: BrokenReasonType;
      studentNumber?: string;
    };

export const adminChangeStatusApi = async (params: AdminChangeStatusParams) => {
  try {
    const response = await api.post("/cabinet/admin/change/status", params);

    if (response.status === 200) {
      return {
        message: response.data.message,
        data: response.data,
      };
    }
  } catch (error) {
    throw error;
  }
};
