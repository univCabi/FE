import CabinetSVG from "@/icons/cabinet.svg?react";

interface CabinetInformationDisplayProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: number | null;
  selectedMultiCabinets: number[];
  multiButtonActive: boolean;
}

const AdminCabinetInformationDisplay = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
  selectedMultiCabinets,
  multiButtonActive,
}: CabinetInformationDisplayProps) => {
  return (
    <div className="text-center w-[17rem]">
      <div className="pb-5 flex justify-center">
        <CabinetSVG />
      </div>
      <h2 className="font-bold text-xl w-full break-all">
        {selectedBuilding} {selectedFloor}F {""}
        {multiButtonActive && selectedMultiCabinets.length > 0 ? (
          <>
            <br />
            {selectedMultiCabinets.sort((a, b) => a - b).join(",")}번
          </>
        ) : (
          selectedCabinet && `${selectedCabinet}번`
        )}
      </h2>
    </div>
  );
};

export default AdminCabinetInformationDisplay;
