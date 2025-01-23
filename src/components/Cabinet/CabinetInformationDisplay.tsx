// 클릭했을 때 사물함 status에 따른 사물함 정보 화면
import CabinetSVG from "@/icons/cabinet.svg?react";

interface CabinetInformationDisplayProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: number | null;
  statusMessage: string;
}

const CabinetInformationDisplay = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
  statusMessage,
}: CabinetInformationDisplayProps) => (
  <div className="text-center">
    <div className="pb-5 flex justify-center">
      <CabinetSVG />
    </div>
    <h2 className="font-bold text-xl">
      {selectedBuilding} {selectedFloor}F {selectedCabinet}번
    </h2>
    {statusMessage && (
      <p className="mt-10 text-red-600 font-bold">{statusMessage}</p>
    )}
  </div>
);

export default CabinetInformationDisplay;
