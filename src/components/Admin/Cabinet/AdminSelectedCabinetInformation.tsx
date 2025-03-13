import { SelectedCabinet } from "@/types/CabinetType";
import AdminCabinetInformationDisplay from "@/components/Admin/Cabinet/AdminCabinetInformationDisplay";
import AdminStateManagementModal from "@/components/Admin/Cabinet/AdminStateManagementModal";
import CabinetActionButtons from "@/components/Cabinet/CabinetActionButtons";
import ConfirmModalView from "@/components/ConfirmModalView";
import { useAdminCabinet } from "@/hooks/useAdminCabinet";
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
  setIsMyCabinet: (isMine: boolean) => void;
  selectedMultiCabinets: number[];
  multiButtonActive: boolean;
  username: string | null;
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

const AdminSelectedCabinetInformation = ({
  selectedCabinet,
  selectedBuilding,
  selectedFloor,
  setSelectedCabinet,
  selectedStatus,
  setSelectedStatus,
  expiredAt,
  setExpiredAt,
  setIsMyCabinet,
  selectedMultiCabinets,
  multiButtonActive,
  username,
}: SelectedCabinetInformationProps) => {
  const { openReturnModal, setOpenReturnModal } = useConfirmModalState();
  const { openStateManagementModal, setOpenStateManagementModal } =
    useAdminCabinet();

  // 반납 버튼 클릭 -> 반납 모달창 생성
  const clickedReturnButton = () => {
    setOpenReturnModal(true);
  };
  // 반납 모달 -> '취소'버튼 누르면 모달 닫기
  const closeReturnModal = () => {
    setOpenReturnModal(false);
  };
  // 상태관리 모달
  const clickedStateManagementButton = () => {
    setOpenStateManagementModal(true);
  };

  // 취소 버튼 -> 사물함 선택 해제
  const cancelButton = () => {
    setSelectedCabinet(null);
  };

  // 상태관리 api 호출 함수
  const fetchCabinetStateManage = () => {
    console.log("상태관리 api 호출 함수");
  };

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
        selectedStatus === "USING" || selectedStatus === "OVERDUE" ? (
          <>
            <AdminCabinetInformationDisplay
              selectedBuilding={selectedBuilding}
              selectedFloor={selectedFloor}
              selectedCabinet={selectedCabinet.cabinetNumber}
              selectedMultiCabinets={selectedMultiCabinets}
              multiButtonActive={multiButtonActive}
            />
            <CabinetActionButtons
              onReturnClick={clickedReturnButton}
              onStateManagementClick={clickedStateManagementButton}
              onCancelClick={cancelButton}
              text="반납"
              stateManagementText="상태 관리"
            />
            <div className="text-lg">
              <p>
                사용자: <strong>{username}</strong>
              </p>
              <p>
                반납 기한: <strong>{formatDate(expiredAt)}</strong>
              </p>
            </div>
            {openReturnModal && (
              <ConfirmModalView
                onClick={fetchCabinetReturn}
                setModalCancelState={setOpenReturnModal}
                title={`${
                  multiButtonActive && selectedMultiCabinets.length > 0
                    ? "일괄 반납 처리"
                    : selectedCabinet
                      ? "반납 처리"
                      : ""
                }`}
                boldText={`${selectedBuilding} ${selectedFloor}F ${
                  multiButtonActive && selectedMultiCabinets.length > 0
                    ? "\n" +
                      selectedMultiCabinets.sort((a, b) => a - b).join(",") +
                      "번"
                    : selectedCabinet
                      ? `${selectedCabinet.cabinetNumber}번`
                      : ""
                }`}
                text={"이 사물함을 반납 처리하시겠습니까?"}
              />
            )}
            {openStateManagementModal && (
              <AdminStateManagementModal
                onClick={fetchCabinetStateManage}
                setModalCancelState={setOpenStateManagementModal}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                boldText={`${selectedBuilding} ${selectedFloor}F ${
                  multiButtonActive && selectedMultiCabinets.length > 0
                    ? "\n" +
                      selectedMultiCabinets.sort((a, b) => a - b).join(",") +
                      "번"
                    : selectedCabinet
                      ? `${selectedCabinet.cabinetNumber}번`
                      : ""
                }`}
              />
            )}
          </>
        ) : selectedStatus === "AVAILABLE" || selectedStatus === "BROKEN" ? (
          <>
            <AdminCabinetInformationDisplay
              selectedBuilding={selectedBuilding}
              selectedFloor={selectedFloor}
              selectedCabinet={selectedCabinet.cabinetNumber}
              selectedMultiCabinets={selectedMultiCabinets}
              multiButtonActive={multiButtonActive}
            />
            <CabinetActionButtons
              onStateManagementClick={clickedStateManagementButton}
              onCancelClick={cancelButton}
              stateManagementText="상태 관리"
            />
            {openStateManagementModal && (
              <AdminStateManagementModal
                onClick={fetchCabinetStateManage}
                setModalCancelState={setOpenStateManagementModal}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                boldText={`${selectedBuilding} ${selectedFloor}F ${
                  multiButtonActive && selectedMultiCabinets.length > 0
                    ? "\n" +
                      selectedMultiCabinets.sort((a, b) => a - b).join(",") +
                      "번"
                    : selectedCabinet
                      ? `${selectedCabinet.cabinetNumber}번`
                      : ""
                }`}
              />
            )}
          </>
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
export default AdminSelectedCabinetInformation;
