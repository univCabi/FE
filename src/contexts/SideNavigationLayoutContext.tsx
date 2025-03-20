import { createContext } from "react";
import { BuildingData } from "@/types/CabinetType";

interface SideNavigationLayoutContextType {
  buildingList: BuildingData[]; // 건물 배열 (name과 floors 포함)
  selectedBuilding: string | null; // 선택된 건물의 인덱스 또는 null
  setSelectedBuilding: (building: string | null) => void;
}

const defaultContext: SideNavigationLayoutContextType = {
  buildingList: [],
  selectedBuilding: null,
  setSelectedBuilding: () => {},
};

export const SideNavigationLayoutContext =
  createContext<SideNavigationLayoutContextType>(defaultContext);
