import { SelectedCabinetInfo } from "@/types/CabinetType";
import { CabinetStatus } from "@/types/StatusEnum";
import { formatDate } from "@/utils/formatDate";
import CabinetActionButtons from "@/components/Cabinet/CabinetActionButtons";
import CabinetInformationDisplay from "@/components/Cabinet/CabinetInformationDisplay";
import AlertModalView from "@/components/Modal/AlertModalView";
import ConfirmModalView from "@/components/Modal/ConfirmModalView";
import { useBookmark } from "@/hooks/useBookmark";
import { useCabinetRental } from "@/hooks/useCabinetRental";
import { useCabinetReturn } from "@/hooks/useCabinetReturn";
import { useConfirmModalState } from "@/hooks/useConfirmModalState";
import BookmarkAddSVG from "@/icons/bookmarkAdd.svg?react";
import BookmarkRemoveSVG from "@/icons/bookmarkRemove.svg?react";
import CabinetSVG from "@/icons/cabinet.svg?react";
import ErrorSVG from "@/icons/error.svg?react";

// 선택된 사물함 정보
interface SelectedCabinetInformationProps extends SelectedCabinetInfo {
  setExpiredAt: (expiredAt: string | null) => void;
  isMyCabinet: boolean;
  setIsMyCabinet: (isMine: boolean) => void;
  setUsername: (username: string | null) => void;
  isRentAvailable: boolean;
  setIsRentAvailable: (isRentAvailable: boolean) => void;
  isBookmark: boolean;
  setIsBookmark: (isBookmarked: boolean) => void;
}

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
  setUsername,
  isRentAvailable,
  setIsRentAvailable,
  isBookmark,
  setIsBookmark,
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

  const { fetchCabinetReturn } = useCabinetReturn({
    selectedCabinet,
    closeReturnModal,
    setSelectedStatus,
    setExpiredAt,
    setIsMyCabinet,
    setUsername,
    setIsRentAvailable,
  });
  const { fetchCabinetRental, openRentalErrorModal, setOpenRentalErrorModal } =
    useCabinetRental({
      selectedCabinet,
      closeRentalModal,
      setSelectedStatus,
      setExpiredAt,
      setIsMyCabinet,
      setUsername,
      isRentAvailable,
      setIsRentAvailable,
    });
  const { fetchBookmarkAdd, fetchBookmarkRemove } = useBookmark({
    selectedCabinet,
  });
  const toggleBookmark = () => {
    setIsBookmark(!isBookmark);
    if (isBookmark) {
      fetchBookmarkRemove();
    } else {
      fetchBookmarkAdd();
    }
  };

  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center bg-white border-l-2 border-gray-400">
      {selectedCabinet !== null ? (
        <>
          <button onClick={toggleBookmark}>
            {isBookmark === false ? (
              <BookmarkRemoveSVG
                className="absolute -top-2 right-2  flex-col transition-all duration-150 mt-20"
                width={25}
              />
            ) : (
              <BookmarkAddSVG
                className="absolute -top-2 right-2  flex-col transition-all duration-150 mt-20"
                width={25}
              />
            )}
          </button>
          {openRentalErrorModal && (
            <AlertModalView
              setModalCancelState={setOpenRentalErrorModal}
              title={"대여 실패"}
              text={"현재 이용 중인 사물함이 있습니다."}
              svgComponent={<ErrorSVG />}
            />
          )}
          {selectedStatus === CabinetStatus.AVAILABLE ? (
            isRentAvailable === true ? (
              <>
                <CabinetInformationDisplay
                  selectedBuilding={selectedBuilding}
                  selectedFloor={selectedFloor}
                  selectedCabinet={selectedCabinet}
                  statusMessage=""
                />
                <CabinetActionButtons
                  onRentalClick={clickedRentalButton}
                  onCancelClick={cancelButton}
                  isRentAvailble={isRentAvailable}
                  selectedStatus={selectedStatus}
                  text="대여"
                />
                {openRentalModal && (
                  <ConfirmModalView
                    onClick={fetchCabinetRental}
                    setModalCancelState={setOpenRentalModal}
                    title={"대여 확인"}
                    cabinetInfo={`${selectedBuilding} ${selectedFloor}F ${selectedCabinet?.cabinetNumber}번 사물함`}
                    text={"이 사물함을 대여하시겠습니까?"}
                  />
                )}
              </>
            ) : (
              <>
                <CabinetInformationDisplay
                  selectedBuilding={selectedBuilding}
                  selectedFloor={selectedFloor}
                  selectedCabinet={selectedCabinet}
                  statusMessage="오후 1시 오픈 예정입니다."
                />
                <CabinetActionButtons
                  onRentalClick={clickedRentalButton}
                  onCancelClick={cancelButton}
                  selectedStatus={selectedStatus}
                  text="대여"
                />
              </>
            )
          ) : selectedStatus === CabinetStatus.USING && isMyCabinet ? (
            <>
              <CabinetInformationDisplay
                selectedBuilding={selectedBuilding}
                selectedFloor={selectedFloor}
                selectedCabinet={selectedCabinet}
                statusMessage=""
              />
              <CabinetActionButtons
                onReturnClick={clickedReturnButton}
                onCancelClick={cancelButton}
                selectedStatus={selectedStatus}
                text="반납"
              />
              <div className="text-lg">
                <p>
                  반납 기한: <br />
                  <strong>{formatDate(expiredAt)}</strong>
                </p>
              </div>
              {openReturnModal && (
                <ConfirmModalView
                  onClick={fetchCabinetReturn}
                  setModalCancelState={setOpenReturnModal}
                  title={"반납 확인"}
                  text={"이 사물함을 반납하시겠습니까?"}
                />
              )}
            </>
          ) : (selectedStatus === CabinetStatus.USING && !isMyCabinet) ||
            selectedStatus === CabinetStatus.OVERDUE ? (
            <CabinetInformationDisplay
              selectedBuilding={selectedBuilding}
              selectedFloor={selectedFloor}
              selectedCabinet={selectedCabinet}
              statusMessage="이미 대여중인 사물함입니다."
            />
          ) : selectedStatus === CabinetStatus.BROKEN ? (
            <CabinetInformationDisplay
              selectedBuilding={selectedBuilding}
              selectedFloor={selectedFloor}
              selectedCabinet={selectedCabinet}
              statusMessage="사용이 불가능한 사물함입니다."
            />
          ) : null}
        </>
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
