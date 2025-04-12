import {
  BrokenReasonType,
  CabinetStatus,
  CabinetStatusType,
} from "@/types/StatusEnum";
import api from "@/api/axiosInterceptApi";

interface AdminChangeStatusParams {
  cabinetIds: number[];
  newStatus: CabinetStatusType;
  reason?: BrokenReasonType;
  studentNumber?: string;
}

export const adminChangeStatusApi = async ({
  cabinetIds,
  newStatus,
  reason,
  studentNumber,
}: AdminChangeStatusParams) => {
  if (newStatus === CabinetStatus.BROKEN && !reason) {
    throw new Error("BROKEN 상태일 경우 reason이 필요합니다.");
  }

  if (
    (newStatus === CabinetStatus.USING ||
      newStatus === CabinetStatus.OVERDUE) &&
    !studentNumber
  ) {
    throw new Error(
      "USING 또는 OVERDUE 상태일 경우 studentNumber가 필요합니다.",
    );
  }

  try {
    const response = await api.post("/cabinet/admin/change/status", {
      cabinetIds,
      newStatus,
      reason,
      studentNumber,
    });

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
