export interface BuildingData {
  building: string;
  floor: number[];
  section: string;
}

export interface SelectedCabinet {
  cabinetId: number;
  cabinetNumber: number;
}

export interface CabinetLayout {
  selectedBuilding: { building: string } | null;
  selectedFloor: number | null;
  isMyCabinet: boolean;
  filteredCabinetDetail: {
    id: number;
    cabinetNumber: number;
  } | null;
  fetchCabinetDetailInformation: (id: number, cabientNumber: number) => void;
}

export interface SelectedCabinetInfo {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: SelectedCabinet | null;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  selectedStatus: string;
  expiredAt: string | null;
  setSelectedStatus: (status: string) => void;
  setExpiredAt: (expiredAt: string | null) => void;
  isMyCabinet: boolean;
  setIsMyCabinet: (isMine: boolean) => void;
}

export interface CabinetInfoDisplay {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: SelectedCabinet | null;
}
