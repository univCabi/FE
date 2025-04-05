import { useEffect } from "react";
import { SelectedCabinet, StatusData } from "@/types/CabinetType";
import { SelectedMultiCabinetsData } from "@/types/MultiCabinetType";
import {
  BrokenReason,
  BrokenReasonType,
  CabinetStatus,
  CabinetStatusType,
} from "@/types/StatusEnum";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useAdminStatus } from "@/hooks/Admin/useAdminStatus";
import { useBuildingState } from "@/hooks/useBuildingState";
import AngleDownSVG from "@/icons/angleDown.svg?react";

interface HandleModalProps extends SelectedMultiCabinetsData {
  setModalCancelState: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  cabinetInfo?: string;
  selectedCabinet: SelectedCabinet | null;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  setSelectedMultiCabinets: React.Dispatch<
    React.SetStateAction<StatusData[] | null>
  >;
  closeReturnModal: () => void;
}

const AdminStateManagementModal = ({
  setModalCancelState,
  selectedStatus,
  setSelectedStatus,
  cabinetInfo,
  selectedCabinet,
  isMultiButtonActive,
  selectedMultiCabinets,
  setSelectedCabinet,
  setSelectedMultiCabinets,
  closeReturnModal,
}: HandleModalProps) => {
  const {
    canSelectedReasonButton,
    selectedBrokenReason,
    newStatus,
    setNewStatus,
    getStatusLabel,
    getMultiCabinetStatusLabel,
    setSelectedBrokenReason,
    handleStatusSave,
    handleReasonClick,
  } = useAdminStatus({
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
  const { isDropdownOpen, setIsDropdownOpen, dropdownOutsideRef } =
    useBuildingState();

  // 상태관리 드롭다운
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 상태관리 함수
  const handleMultiStatusChange = (status: CabinetStatusType) => {
    setNewStatus(status);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setSelectedBrokenReason(selectedBrokenReason);
  }, [selectedBrokenReason]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-5">상태 관리</h2>
        <div className="text-lg w-full break-all">
          <b className="whitespace-pre-line">{cabinetInfo}</b>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col w-72">
            <p className="mt-5 mb-2 text-left ">고장 처리</p>
            <div>
              <div className="relative" ref={dropdownOutsideRef}>
                <button
                  className="p-4 w-full text-left flex flex-row bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-300"
                  onClick={toggleDropdown}
                >
                  {isMultiButtonActive
                    ? getMultiCabinetStatusLabel()
                    : !newStatus
                      ? getMultiCabinetStatusLabel()
                      : getStatusLabel(newStatus)}
                  <AngleDownSVG className="ml-[70%]" fill="#2563eb" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute mt-1 w-full bg-white text-black rounded-md shadow-lg z-10">
                    <button
                      className="block my-1 p-4 w-full text-left hover:bg-blue-300 hover:text-white rounded-md"
                      onClick={() =>
                        handleMultiStatusChange(CabinetStatus.AVAILABLE)
                      }
                    >
                      사용 가능
                    </button>
                    <button
                      className="block my-1 p-4 w-full text-left hover:bg-blue-300 hover:text-white rounded-md"
                      onClick={() =>
                        handleMultiStatusChange(CabinetStatus.BROKEN)
                      }
                    >
                      사용 불가
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-72">
            <p className="mt-5 mb-2 text-left">고장 이유</p>
            <div className="flex flex-row justify-between items-center">
              <SubmitAndNavigateButton
                text="잠금"
                className={`w-32 h-10 border rounded-lg ${
                  canSelectedReasonButton
                    ? "text-blue-600 border-blue-600 hover:bg-blue-300"
                    : "text-gray-400 border-gray-400 disabled"
                } ${selectedBrokenReason === BrokenReason.잠금 ? "bg-blue-600 text-white" : ""}`}
                onClick={() => handleReasonClick(BrokenReason.잠금)}
                disabled={!canSelectedReasonButton}
              />

              <SubmitAndNavigateButton
                text="파손"
                className={`w-32 h-10 border rounded-lg ${
                  canSelectedReasonButton
                    ? "text-blue-600 border-blue-600 hover:bg-blue-300"
                    : "text-gray-400 border-gray-400 disabled"
                } ${selectedBrokenReason === BrokenReason.파손 ? "bg-blue-600 text-white" : ""}`}
                onClick={() => handleReasonClick(BrokenReason.파손)}
                disabled={!canSelectedReasonButton}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            onClick={() =>
              handleStatusSave(
                newStatus as CabinetStatusType,
                selectedBrokenReason as BrokenReasonType,
              )
            }
          >
            저장
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-100"
            onClick={() => {
              setModalCancelState(false);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStateManagementModal;
