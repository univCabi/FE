// admin 전용
export interface SelectedMultiCabinetsData {
  cabinetNumber: number;
  id: number;
  status: string;
}

export interface MultiCabinet {
  selectedMultiCabinets: SelectedMultiCabinetsData[] | null;
  isMultiButtonActive: boolean;
}
