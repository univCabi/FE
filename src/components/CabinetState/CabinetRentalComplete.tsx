// 대여 성공 컴포넌트

import { useCabinetReturnModal } from "@/hooks/useCabinetReturnModal";
import CabinetReturnConfirmModal from "./CabinetReturnConfirmModal";

interface CabinetRentalCompleteProps {
  selectedCabinet: string;
  confirmReturn: () => void;
  closeReturnModal: () => void;
}

const CabinetRentalComplete = ({
  selectedCabinet,
  confirmReturn,
  closeReturnModal,
}: CabinetRentalCompleteProps) => {
  const { openReturnModal, setOpenReturnModal } = useCabinetReturnModal();

  // 반납 버튼 클릭 -> 반납 모달창 생성
  const clickedReturnButton = () => {
    setOpenReturnModal(true);
  };

  return (
    <div>
      <h2 className="font-bold text-xl">{selectedCabinet}번 사물함</h2>
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
