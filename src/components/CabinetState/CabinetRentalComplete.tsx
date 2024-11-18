// 대여 성공 컴포넌트

import { useCabinetReturnModal } from "@/hooks/useCabinetReturnModal";
import { useCabinetStateManagement } from "@/hooks/useCabinetStateManagement";
import CabinetReturnConfirmModal from "@/components/CabinetState/CabinetReturnConfirmModal";
import CabinetRental from "@/components/CabinetState/CabinetRental";
import CabinetSVG from "@/icons/cabinet.svg?react";

interface CabinetRentalCompleteProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: number;
}

const CabinetRentalComplete = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
}: CabinetRentalCompleteProps) => {
  const { openReturnModal, setOpenReturnModal } = useCabinetReturnModal();
  const { isRented, setIsRented } = useCabinetStateManagement();

  // 반납 버튼 클릭 -> 반납 모달창 생성
  const clickedReturnButton = () => {
    setOpenReturnModal(true);
  };

  // 반납 모달 -> '확인' 버튼 누르면 isRented가 false로 변경 -> 대여 중 X
  const confirmReturn = () => {
    // CabinetRental.tsx에서 isRented=true 인게 저장이 안되어서 우선 해당 코드에서 true로 구현
    setIsRented(true);
    setOpenReturnModal(false);
  };
  // 반납 모달 -> '취소'버튼 누르면 모달 닫기
  const closeReturnModal = () => {
    setOpenReturnModal(false);
  };

  if (isRented) {
    return (
      <CabinetRental
        selectedBuilding={selectedBuilding}
        selectedFloor={selectedFloor}
        selectedCabinet={selectedCabinet}
      />
    );
  }

  return (
    <div>
      <div className="pb-5 flex justify-center">
        <CabinetSVG />
      </div>
      <h2 className="font-bold text-xl">
        {selectedBuilding} {selectedFloor} {selectedCabinet}번
      </h2>
      <div className="p-10">
        <button
          onClick={clickedReturnButton}
          className="p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
        >
          반납
        </button>
        <button className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150">
          취소
        </button>
      </div>
      <div className="text-lg">
        <p>
          반납 기한까지 <strong>n</strong>일 남았습니다 <br />
          2024.12.31
        </p>
      </div>

      {openReturnModal && (
        <CabinetReturnConfirmModal
          confirmReturn={confirmReturn}
          closeReturnModal={closeReturnModal}
        />
      )}
    </div>
  );
};

export default CabinetRentalComplete;
