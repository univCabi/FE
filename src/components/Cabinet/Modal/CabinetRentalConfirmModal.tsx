// 대여 버튼 눌렀을 때, 대여 확인 모달

import { useCabinetRental } from "@/hooks/useCabinetRental";

interface CabinetRentalConfirmModalProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
  closeRentalModal: () => void;
  setSelectedStatus: (status: string) => void;
  setExpiredAt: (expiredAt: string | null) => void;
  setIsMyCabinet: (isMine: boolean) => void;
}

const CabinetRentalConfirmModal = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
  closeRentalModal,
  setSelectedStatus,
  setExpiredAt,
  setIsMyCabinet,
}: CabinetRentalConfirmModalProps) => {
  const { fetchCabinetRental } = useCabinetRental({
    selectedCabinet,
    closeRentalModal,
    setSelectedStatus,
    setExpiredAt,
    setIsMyCabinet,
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-5">대여 확인</h2>

        <div className="text-lg">
          <b>
            {selectedBuilding} {selectedFloor}F {selectedCabinet?.cabinetNumber}
            번 사물함
          </b>
          <p>이 사물함을 대여하시겠습니까?</p>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            onClick={fetchCabinetRental}
          >
            확인
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-100"
            onClick={closeRentalModal}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabinetRentalConfirmModal;
