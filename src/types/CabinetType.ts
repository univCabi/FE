export interface BuildingData {
  building: string;
  floor: number[];
  section: string;
}

export interface BuildingFloorSingleData extends Omit<BuildingData, "floor"> {
  floor: number;
}

export interface CabinetData extends BuildingFloorSingleData {
  id: number;
  cabinetNumber: number;
  cabinetXPos: number;
  cabinetYPos: number;
  status: string;
  isVisible: boolean | null;
  username: string | null;
  isMine: boolean;
  expiredAt: string | null;
}

export interface SelectedCabinet {
  cabinetId: number;
  cabinetNumber: number;
}

export interface BuildingInfo {
  selectedBuilding: string | null;
  selectedFloor: number | null;
}
export interface CabinetInfo extends BuildingInfo {
  selectedCabinet: SelectedCabinet | null;
}

export interface SelectedCabinetInfo extends CabinetInfo {
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  selectedStatus: string;
  expiredAt: string | null;
  setSelectedStatus: (status: string) => void;
  setExpiredAt: (expiredAt: string | null) => void;
  setIsMyCabinet: (isMine: boolean) => void;
}

export interface CabinetButtonLayoutProps extends BuildingInfo {
  isMyCabinet: boolean;
  filteredCabinetDetail: {
    id: number;
    cabinetNumber: number;
  } | null;
  fetchCabinetDetailInformation: (id: number, cabientNumber: number) => void;
}

// admin 전용
export interface SelectedMultiCabinetsData {
  cabinetNumber: number;
  id: number;
  status: string;
}
