// 사물함 대여 컴포넌트

import { useCabinetRentalModal } from "@/hooks/useCabinetRentalModal";
import { useCabinetStateManagement } from "@/hooks/useCabinetStateManagement";
import CabinetRentalConfirmModal from "@/components/CabinetState/CabinetRentalConfirmModal";
import CabinetRentalComplete from "@/components/CabinetState/CabinetRentalComplete";
import CabinetSVG from "@/icons/cabinet.svg?react";

interface CabinetRentalProps {
  selectedCabinet: number;
}

const CabinetRental = ({ selectedCabinet }: CabinetRentalProps) => {
  const { openRentalModal, setOpenRentalModal } = useCabinetRentalModal();
  const { isRented, setIsRented } = useCabinetStateManagement();

  // 대여 버튼 클릭
  const clickedRentalButton = () => {
    setOpenRentalModal(true);
  };
  // 대여 모달 -> '확인' 버튼 누르면 isRented가 true로 변경 -> 대여 중 O
  const confirmRental = () => {
    setIsRented(true);
    setOpenRentalModal(false);
  };
  // 대여 모달 -> '취소'버튼 누르면 모달 닫기
  const closeRentalModal = () => {
    setOpenRentalModal(false);
  };

  // 사물함이 대여 중이라면 CabinetRentalComplete.tsx 반환
  if (isRented) {
    return <CabinetRentalComplete selectedCabinet={selectedCabinet} />;
  }

  return (
    <div>
      <div className="pb-5 flex justify-center">
        <CabinetSVG />
      </div>
      <div className="font-bold text-xl">{selectedCabinet}번</div>
      <button
        onClick={clickedRentalButton}
        className="mt-10 p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
      >
        대여
      </button>
      <button className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150">
        취소
      </button>

      {openRentalModal && (
        <CabinetRentalConfirmModal
          closeRentalModal={closeRentalModal}
          confirmRental={confirmRental}
          selectedCabinet={selectedCabinet}
        />
      )}
    </div>
  );
};

export default CabinetRental;
