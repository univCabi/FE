export interface Modal {
  setModalCancelState: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  cabinetInfo?: string;
  text?: string;
}
