export interface BuildingData {
  building: string;
  floor: string[];
  section: string;
}

export interface SelectedCabinet {
  cabinetId: number;
  cabinetNumber: number;
}

export interface UserInfo {
  name: string | null;
  affiliation: string | null;
  studentNumber: number | null;
  phoneNumber: string | null;
}

export interface RentCabinetInfo {
  building: string | null;
  floor: string | null;
  cabinetNumber: number | null;
  status: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface UserData extends UserInfo {
  isVisible: boolean;
  rentCabinetInfo: RentCabinetInfo;
}
