import CabinetRental from "@/components/CabinetState/CabinetRental";

// 선택된 사물함 정보
interface SelectedCabinetInformationProps {
  selectedCabinet: string | null;
}

const SelectedCabinetInformation = ({
  selectedCabinet,
}: SelectedCabinetInformationProps) => {
  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center">
      {selectedCabinet ? (
        <CabinetRental selectedCabinet={selectedCabinet} />
      ) : (
        <div>
          <div className="pb-5">icon</div>
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
