import { BuildingFloorSingleData } from "@/types/CabinetType";

export interface AdminListTableType extends BuildingFloorSingleData {
  id: number;
  position: {
    x: number;
    y: number;
  };
  cabinetNumber: number;
  status: "AVAILABLE" | "OVERDUE" | "USING" | "BROKEN";
  reason: string | null;
  user: { studentNumber: number; name: string } | null;
}
