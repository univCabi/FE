import CabinetSVG from "@/icons/cabinet.svg?react";
import { useCabinetRentalModal } from "@/hooks/useCabinetRentalModal";
import { useCabinetReturnModal } from "@/hooks/useCabinetReturnModal";
import CabinetRentalConfirmModal from "@/components/CabinetState/CabinetRentalConfirmModal";
import CabinetReturnConfirmModal from "@/components/CabinetState/CabinetReturnConfirmModal";

// 선택된 사물함 정보
interface SelectedCabinetInformationProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
  setSelectedCabinet: (
    cabinet: {
      cabinetId: number;
      cabinetNumber: number;
    } | null
  ) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string) => void;
  expiredAt: string | null;
  setExpiredAt: (expiredAt: string | null) => void;
  isMineState: boolean;
  setIsMineState: (isMine: boolean) => void;
}

// 날짜 포맷팅 함수
const formatDate = (isoString: string | null): string => {
  if (!isoString) return "날짜 정보 없음";
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleDateString("ko-KR", options);
};

const SelectedCabinetInformation = ({
  selectedCabinet,
  selectedBuilding,
  selectedFloor,
  setSelectedCabinet,
  selectedStatus,
  setSelectedStatus,
  expiredAt,
  setExpiredAt,
  isMineState,
  setIsMineState,
}: SelectedCabinetInformationProps) => {
  const { openRentalModal, setOpenRentalModal } = useCabinetRentalModal();
  const { openReturnModal, setOpenReturnModal } = useCabinetReturnModal();

  // 대여 버튼 클릭
  const clickedRentalButton = () => {
    setOpenRentalModal(true);
  };

  // 대여 모달 -> '취소'버튼 누르면 모달 닫기
  const closeRentalModal = () => {
    setOpenRentalModal(false);
  };
  // 반납 버튼 클릭 -> 반납 모달창 생성
  const clickedReturnButton = () => {
    setOpenReturnModal(true);
  };

  // 반납 모달 -> '취소'버튼 누르면 모달 닫기
  const closeReturnModal = () => {
    setOpenReturnModal(false);
  };

  // 취소 버튼 -> 사물함 선택 해제
  const cancelButton = () => {
    setSelectedCabinet(null);
  };

  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center bg-white border-l-2 border-gray-400 ">
      {selectedCabinet !== null ? (
        selectedStatus === "AVAILABLE" ? (
          // 상태가 AVAILABLE일 경우
          <>
            <div>
              <div className="pb-5 flex justify-center">
                <CabinetSVG />
              </div>
              <div className="font-bold text-xl">
                {selectedBuilding} {selectedFloor}F{" "}
                {selectedCabinet.cabinetNumber}번
              </div>
              <button
                onClick={clickedRentalButton}
                className="mt-10 p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
              >
                대여
              </button>
              <button
                onClick={cancelButton}
                className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150"
              >
                취소
              </button>
            </div>

            {openRentalModal && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <CabinetRentalConfirmModal
                  selectedBuilding={selectedBuilding}
                  selectedFloor={selectedFloor}
                  selectedCabinet={selectedCabinet}
                  closeRentalModal={closeRentalModal}
                  setSelectedStatus={setSelectedStatus}
                  setExpiredAt={setExpiredAt}
                  setIsMineState={setIsMineState}
                />
              </div>
            )}
          </>
        ) : selectedStatus === "USING" && isMineState === true ? (
          // 상태가 USING이고 본인의 사물함일 경우
          <>
            <div>
              <div className="pb-5 flex justify-center">
                <CabinetSVG />
              </div>
              <h2 className="font-bold text-xl">
                {selectedBuilding} {selectedFloor}F{" "}
                {selectedCabinet.cabinetNumber}번
              </h2>
              <div className="p-10">
                <button
                  onClick={clickedReturnButton}
                  className="p-4 w-60 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-150"
                >
                  반납
                </button>
                <button
                  onClick={cancelButton}
                  className="mt-4 p-4 w-60 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition-all duration-150"
                >
                  취소
                </button>
              </div>
              <div className="text-lg">
                <p>
                  반납 기한: <br />
                  <strong>{formatDate(expiredAt)}</strong>
                </p>
              </div>

              {openReturnModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                  <CabinetReturnConfirmModal
                    selectedBuilding={selectedBuilding}
                    selectedFloor={selectedFloor}
                    selectedCabinet={selectedCabinet}
                    closeReturnModal={closeReturnModal}
                    setSelectedStatus={setSelectedStatus}
                    setExpiredAt={setExpiredAt}
                    setIsMineState={setIsMineState}
                  />
                </div>
              )}
            </div>
          </>
        ) : selectedStatus === "USING" && isMineState == false ? (
          // 상태가 USING이고 타인의 사물함일 경우
          <div className="text-center">
            <div className="pb-5 flex justify-center">
              <CabinetSVG />
            </div>
            <h2 className="font-bold text-xl">
              {selectedBuilding} {selectedFloor}F{" "}
              {selectedCabinet.cabinetNumber}번
            </h2>
            <p className="mt-10 text-red-600 font-bold">
              이미 대여중인 사물함입니다.
            </p>
          </div>
        ) : null
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
