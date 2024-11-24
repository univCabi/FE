import CabinetRental from "@/components/CabinetState/CabinetRental";
import CabinetSVG from "@/icons/cabinet.svg?react";

// 선택된 사물함 정보
interface SelectedCabinetInformationProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: number | null;
  // selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
}

const SelectedCabinetInformation = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
}: SelectedCabinetInformationProps) => {
  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center bg-white border-l-2 border-gray-400 ">
      {/* 건물, 층, 사물함 모두 선택했을 때만 사물함 정보 표시 */}
      {selectedCabinet !== null ? (
        <CabinetRental
          selectedBuilding={selectedBuilding}
          selectedFloor={selectedFloor}
          selectedCabinet={selectedCabinet}
        />
      ) : (
        <div>
          <div className="flex justify-center pb-5">
            <CabinetSVG />
          </div>
          <div>
            사물함을
            <br />
            선택해주세요
          </div>
        </div>
      )}
    </div>
  );
};
export default SelectedCabinetInformation;
