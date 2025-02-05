import { SelectedCabinet } from "@/types/CabinetType";
import CabinetActionButtons from "@/components/Cabinet/CabinetActionButtons";
import CabinetInformationDisplay from "@/components/Cabinet/CabinetInformationDisplay";
import ConfirmModalView from "@/components/ConfirmModalView";
import { useCabinetRental } from "@/hooks/useCabinetRental";
import { useCabinetReturn } from "@/hooks/useCabinetReturn";
import { useConfirmModalState } from "@/hooks/useConfirmModalState";
import CabinetSVG from "@/icons/cabinet.svg?react";

// 선택된 사물함 정보
interface SelectedCabinetInformationProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  expiredAt: string | null;
  setExpiredAt: (expiredAt: string | null) => void;
  isMyCabinet: boolean;
  setIsMyCabinet: (isMine: boolean) => void;
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
  isMyCabinet,
  setIsMyCabinet,
}: SelectedCabinetInformationProps) => {
  const {
    openRentalModal,
    openReturnModal,
    setOpenRentalModal,
    setOpenReturnModal,
  } = useConfirmModalState();
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

  const { fetchCabinetRental } = useCabinetRental({
    selectedCabinet,
    closeRentalModal,
    setSelectedStatus,
    setExpiredAt,
    setIsMyCabinet,
  });

  const { fetchCabinetReturn } = useCabinetReturn({
    selectedCabinet,
    closeReturnModal,
    setSelectedStatus,
    setExpiredAt,
    setIsMyCabinet,
  });

  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center bg-white border-l-2 border-gray-400">
      {selectedCabinet !== null ? (
        selectedStatus === "AVAILABLE" ? (
          // 상태가 AVAILABLE일 경우
          <>
            <>
              <CabinetInformationDisplay
                selectedBuilding={selectedBuilding}
                selectedFloor={selectedFloor}
                selectedCabinet={selectedCabinet.cabinetNumber}
                statusMessage=""
              />
              <CabinetActionButtons
                onRentalClick={clickedRentalButton}
                onCancelClick={cancelButton}
                text="대여"
              />
            </>
            {openRentalModal && (
              <ConfirmModalView
                onClick={fetchCabinetRental}
                setModalCancelState={setOpenRentalModal}
                title={"대여 확인"}
                boldText={`${selectedBuilding} ${selectedFloor}F ${selectedCabinet?.cabinetNumber}번 사물함`}
                text={"이 사물함을 대여하시겠습니까?"}
              />
            )}
          </>
        ) : selectedStatus === "USING" && isMyCabinet === true ? (
          // 상태가 USING이고 본인의 사물함일 경우
          <>
            <>
              <CabinetInformationDisplay
                selectedBuilding={selectedBuilding}
                selectedFloor={selectedFloor}
                selectedCabinet={selectedCabinet.cabinetNumber}
                statusMessage=""
              />
              <CabinetActionButtons
                onReturnClick={clickedReturnButton}
                onCancelClick={cancelButton}
                text="반납"
              />
              <div className="text-lg">
                <p>
                  반납 기한: <br />
                  <strong>{formatDate(expiredAt)}</strong>
                </p>
              </div>
            </>
            {openReturnModal && (
              <ConfirmModalView
                onClick={fetchCabinetReturn}
                setModalCancelState={setOpenReturnModal}
                title={"반납 확인"}
                text={"이 사물함을 반납하시겠습니까?"}
              />
            )}
          </>
        ) : selectedStatus === "USING" && isMyCabinet === false ? (
          // 상태가 USING이고 타인의 사물함일 경우
          <CabinetInformationDisplay
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedCabinet={selectedCabinet.cabinetNumber}
            statusMessage="이미 대여중인 사물함입니다."
          />
        ) : selectedStatus === "BROKEN" || selectedStatus === "OVERDUE" ? (
          <CabinetInformationDisplay
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedCabinet={selectedCabinet.cabinetNumber}
            statusMessage="사용이 불가능한 사물함입니다."
          />
        ) : null
      ) : (
        <>
          <div className="flex justify-center pb-5">
            <CabinetSVG />
          </div>
          사물함을
          <br />
          선택해주세요
        </>
      )}
    </div>
  );
};
export default SelectedCabinetInformation;
