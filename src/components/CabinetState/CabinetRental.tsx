// 사물함 대여 컴포넌트

import { useCabinetRentalModal } from "@/hooks/useCabinetRentalModal";
import { useCabinetReturnModal } from "@/hooks/useCabinetReturnModal";
import CabinetRentalConfirmModal from "@/components/CabinetState/CabinetRentalConfirmModal";
import CabinetRentalComplete from "@/components/CabinetState/CabinetRentalComplete";

interface CabinetRentalProps {
  selectedCabinet: string;
}

const CabinetRental = ({ selectedCabinet }: CabinetRentalProps) => {
  const { openModal, setOpenModal, isRented, setIsRented } =
    useCabinetRentalModal();

  const { setOpenReturnModal } = useCabinetReturnModal();

  // 대여 버튼 클릭
  const clickedRentalButton = () => {
    setOpenModal(true);
  };
  // 대여 모달 -> '확인' 버튼 누르면 isRented가 true로 변경 -> 대여 중 O
  const confirmRental = () => {
    setIsRented(true);
    setOpenModal(false);
  };
  // 대여 모달 -> '취소'버튼 누르면 모달 닫기
  const closeRentalModal = () => {
    setOpenModal(false);
  };

  // 반납 모달 -> '확인' 버튼 누르면 isRented가 false로 변경 -> 대여 중 X
  const confirmReturn = () => {
    setIsRented(false);
    setOpenReturnModal(false);
  };
  // 반납 모달 -> '취소'버튼 누르면 모달 닫기
  const closeReturnModal = () => {
    setOpenReturnModal(false);
  };

  // 사물함이 대여 중이라면 CabinetRentalComplete.tsx 반환
  if (isRented) {
    return (
      <CabinetRentalComplete
        selectedCabinet={selectedCabinet}
        confirmReturn={confirmReturn}
        closeReturnModal={closeReturnModal}
      />
    );
  }

  return (
    <div>
      <div className="pb-5">icon</div>
      <div className="font-bold">{selectedCabinet}번</div>
      <button
        onClick={clickedRentalButton}
        className="mt-10 p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
      >
        대여
      </button>
      <button className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150">
        취소
      </button>

      {openModal && (
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
