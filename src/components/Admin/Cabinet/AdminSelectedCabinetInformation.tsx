import { SelectedCabinetInfo, StatusData } from "@/types/CabinetType";
import { SelectedMultiCabinetsData } from "@/types/MultiCabinetType";
import AdminCabinetInformationDisplay from "@/components/Admin/Cabinet/AdminCabinetInformationDisplay";
import AdminStateManagementModal from "@/components/Admin/Cabinet/AdminStateManagementModal";
import ConfirmModalView from "@/components/ConfirmModalView";
import { useAdminCabinet } from "@/hooks/useAdminCabinet";
import { useAdminReturn } from "@/hooks/useAdminReturn";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useConfirmModalState } from "@/hooks/useConfirmModalState";
import CabinetSVG from "@/icons/cabinet.svg?react";

// 선택된 사물함 정보
interface AdminSelectedCabinetInformationProps
  extends SelectedCabinetInfo,
    SelectedMultiCabinetsData {
  username: string | null;
  setSelectedMultiCabinets: React.Dispatch<
    React.SetStateAction<StatusData[] | null>
  >;
  setModalCancelState: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSelectedCabinetInformation = ({
  selectedCabinet,
  selectedBuilding,
  selectedFloor,
  setSelectedCabinet,
  selectedStatus,
  setSelectedStatus,
  expiredAt,
  selectedMultiCabinets,
  isMultiButtonActive,
  username,
  setSelectedMultiCabinets,
  setModalCancelState,
}: AdminSelectedCabinetInformationProps) => {
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
    setSelectedMultiCabinets(null);
  };

  const { fetchAdminCabinetReturn } = useAdminReturn({
    selectedCabinet,
    selectedMultiCabinets,
    closeReturnModal,
    selectedStatus,
    setSelectedStatus,
    isMultiButtonActive,
    setSelectedCabinet,
    setSelectedMultiCabinets,
  });
  const { showsReturnButton, showsStatusManagementButton } = useAdminStatus({
    selectedStatus,
    setSelectedStatus,
    selectedCabinet,
    isMultiButtonActive,
    selectedMultiCabinets,
    setSelectedCabinet,
    setSelectedMultiCabinets,
    closeReturnModal,
    setModalCancelState,
  });

  const cabinetNumbersSort =
    isMultiButtonActive && selectedMultiCabinets?.length
      ? `\n${selectedMultiCabinets
          ?.map((cabinet) => cabinet.cabinetNumber)
          .sort((a, b) => a - b)
          .join(",")}번`
      : selectedCabinet?.cabinetNumber
        ? `${selectedCabinet.cabinetNumber}번`
        : "";
  const cabinetInformation = `${selectedBuilding} ${selectedFloor}F ${cabinetNumbersSort}`;

  return (
    <div className="absolute inset-y-0 right-0 w-80 pt-20 flex flex-col justify-center items-center bg-white border-l-2 border-gray-400">
      {selectedCabinet !== null &&
      (isMultiButtonActive ? selectedMultiCabinets?.length : true) ? (
        <>
          <AdminCabinetInformationDisplay
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedCabinet={selectedCabinet}
            selectedMultiCabinets={selectedMultiCabinets}
            isMultiButtonActive={isMultiButtonActive}
            clickedReturnButton={clickedReturnButton}
            clickedStateManagementButton={clickedStateManagementButton}
            cancelButton={cancelButton}
            username={username}
            expiredAt={expiredAt}
            selectedStatus={selectedStatus}
            closeReturnModal={closeReturnModal}
            setSelectedStatus={setSelectedStatus}
            setSelectedCabinet={setSelectedCabinet}
            setSelectedMultiCabinets={setSelectedMultiCabinets}
            setModalCancelState={setOpenStateManagementModal}
          />
          {showsReturnButton && openReturnModal && (
            <ConfirmModalView
              onClick={fetchAdminCabinetReturn}
              setModalCancelState={setOpenReturnModal}
              title={`${
                isMultiButtonActive && selectedMultiCabinets?.length
                  ? "일괄 반납 처리"
                  : "반납 처리"
              }`}
              cabinetInfo={cabinetInformation}
              text={"이 사물함을 반납 처리하시겠습니까?"}
            />
          )}
          {(showsReturnButton || showsStatusManagementButton) &&
            openStateManagementModal && (
              <AdminStateManagementModal
                setModalCancelState={setOpenStateManagementModal}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                cabinetInfo={cabinetInformation}
                selectedCabinet={selectedCabinet}
                selectedMultiCabinets={selectedMultiCabinets}
                isMultiButtonActive={isMultiButtonActive}
                setSelectedCabinet={setSelectedCabinet}
                setSelectedMultiCabinets={setSelectedMultiCabinets}
                closeReturnModal={closeReturnModal}
              />
            )}
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
export default AdminSelectedCabinetInformation;
