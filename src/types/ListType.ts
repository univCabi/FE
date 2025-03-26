import { BuildingFloorSingleData } from "@/types/CabinetType";

export interface AdminListTableType extends BuildingFloorSingleData {
  id: number;
  position: {
    x: number;
    y: number;
  };
  cabinetNumber: number;
  status: "AVAILABLE" | "OVERDUE" | "USING" | "BROKEN"; // 이것도 바꿔야 함!!
  reason: string | null;
  user: { studentNumber: number; name: string } | null;
}

export interface HistoryData extends BuildingFloorSingleData {
  cabinetNumber: number;
  startDate: string | null;
  endDate: string | null;
}
