// 대여 성공 컴포넌트

import { useCabinetReturnModal } from "@/hooks/useCabinetReturnModal";
import { useCabinetStateManagement } from "@/hooks/useCabinetStateManagement";
// import CabinetReturnConfirmModal from "@/components/CabinetState/CabinetReturnConfirmModal";
import CabinetRental from "@/components/CabinetState/CabinetRental";
import CabinetSVG from "@/icons/cabinet.svg?react";
import { returnApi } from "@/api/returnApi";

interface CabinetRentalCompleteProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: number;
  // setSelectedCabinet: (cabinetNumber: number | null) => void;
}

const CabinetRentalComplete = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
}: // setSelectedCabinet,
CabinetRentalCompleteProps) => {
  const { openReturnModal, setOpenReturnModal } = useCabinetReturnModal();
  const { isRented, setIsRented, rentedCabinetId, setRentedCabinetId } =
    useCabinetStateManagement();

  // 반납 버튼 클릭 -> 반납 모달창 생성
  const clickedReturnButton = () => {
    setOpenReturnModal(true);
  };

  // 반납 모달 -> '취소'버튼 누르면 모달 닫기
  const closeReturnModal = () => {
    setOpenReturnModal(false);
  };

  const handleReturn = async () => {
    try {
      const response = await returnApi(selectedCabinet); // API 호출
      if (response?.success) {
        console.log("반납 성공:", response);

        setIsRented(false);
        setRentedCabinetId(null);
        // setSelectedCabinet(selectedCabinet);
        closeReturnModal(); // 모달 닫기
      } else {
        console.error("반납 실패:", response?.message);
        closeReturnModal(); // 모달 닫기
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      closeReturnModal(); // 모달 닫기
    }
  };

  // CabinetRentalComplete.tsx
  if (rentedCabinetId === null || rentedCabinetId !== selectedCabinet) {
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
        {selectedBuilding} {selectedFloor}F {selectedCabinet}번
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-5">반납 확인</h2>
            <p>이 사물함을 반납하시겠습니까?</p>

            <div className="mt-5 flex justify-center">
              <button
                className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                onClick={handleReturn} // 확인 버튼 클릭 시 반납 API 호출 + CabinetRental.tsx가 렌더링
              >
                확인
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-100"
                onClick={closeReturnModal} // 취소 버튼 클릭 시 모달 닫기
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabinetRentalComplete;

// <CabinetReturnConfirmModal
//   confirmReturn={confirmReturn}
//   closeReturnModal={closeReturnModal}
//   selectedCabinet={selectedCabinet}
// />
