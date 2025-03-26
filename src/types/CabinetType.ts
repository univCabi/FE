export interface BuildingData {
  building: string;
  floor: number[];
  section: string;
}

export interface StatusData {
  cabinetNumber: number;
  id: number;
  status: string;
}

export interface CabinetData extends StatusData {
  floor: number;
  section: string;
  building: string;
  cabinetXPos: number;
  cabinetYPos: number;
  isVisible: boolean | null;
  username: string | null;
  isMine: boolean;
  expiredAt: string | null;
  studentNumber: string;
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

export interface CabinetLayout extends BuildingInfo {
  isMyCabinet: boolean;
  filteredCabinetDetail: {
    id: number;
    cabinetNumber: number;
  } | null;
  fetchCabinetDetailInformation: (id: number, cabientNumber: number) => void;
}
