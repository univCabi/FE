import { BuildingFloorSingleData } from "@/types/CabinetType";
import { CabinetStatusType } from "@/types/StatusEnum";

export interface AdminListTableType extends BuildingFloorSingleData {
  id: number;
  position: {
    x: number;
    y: number;
  };
  cabinetNumber: number;
  status: CabinetStatusType;
  reason: string | null;
  user: { studentNumber: number; name: string } | null;
  rentalStartDate?: string | null;
  overDate?: string | null;
  brokenDate?: string | null;
}

export type AdminListTableTypeValue =
  AdminListTableType[keyof AdminListTableType];

export type HistoryDataTypeValue = HistoryData[keyof HistoryData];

export interface HistoryData extends BuildingFloorSingleData {
  cabinetNumber: number;
  startDate: string | null;
  endDate: string | null;
}
