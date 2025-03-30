export interface BuildingData {
  building: string;
  floor: number[];
  section: string;
}

export interface BuildingFloorSingleData extends Omit<BuildingData, "floor"> {
  floor: number;
}

export interface StatusData {
  cabinetNumber: number;
  id: number;
  status: string;
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
  setSelectedStatus: (status: string) => void;
  expiredAt: string | null;
}

export interface CabinetDetailInfo extends BuildingInfo {
  isMyCabinet: boolean;
  filteredCabinetDetail: {
    id: number;
    cabinetNumber: number;
  } | null;
  fetchCabinetDetailInformation: (id: number, cabientNumber: number) => void;
}
