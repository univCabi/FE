import { SelectedCabinet } from "@/types/CabinetType";
import { adminChangeStatusApi } from "@/api/adminChangeStatusApi";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useAdminCabinet } from "@/hooks/useAdminCabinet";
import { useBuildingState } from "@/hooks/useBuildingState";
import AngleDownSVG from "@/icons/angleDown.svg?react";

interface HandleModalProps {
  setModalCancelState: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  cabinetInfo?: string;
  selectedCabinet: SelectedCabinet;
}
export enum CabinetStatus {
  AVAILABLE = "AVAILABLE",
  USING = "USING",
  BROKEN = "BROKEN",
  OVERDUE = "OVERDUE",
}

const AdminStateManagementModal = ({
  setModalCancelState,
  selectedStatus,
  setSelectedStatus,
  cabinetInfo,
  selectedCabinet,
}: HandleModalProps) => {
  const { selectedBrokenReason, handleReasonClick } = useAdminCabinet({
    selectedStatus,
  });
  const { isDropdownOpen, setIsDropdownOpen, dropdownOutsideRef } =
    useBuildingState();

  // 상태관리 드롭다운
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getStatusLabel = (status: string) => {
    return status === "BROKEN" ? "사용 불가" : "사용 가능";
  };

  // 상태관리 함수
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  const fetchAdminChangeStatus = async (
    cabinetId: number,
    newStatus: CabinetStatus,
  ) => {
    try {
      const response = await adminChangeStatusApi(cabinetId, newStatus);
      if (response) {
        setSelectedStatus(response.data.status);
        setIsDropdownOpen(false);
        console.log("상태 변경 성공", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = () => {
    console.log("상태 저장");
  };

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
                {/* 현재 선택된 사물함의 상태를 표시하는 버튼 */}
                <button
                  className="p-4 w-full text-left flex flex-row bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-300"
                  onClick={toggleDropdown}
                >
                  {getStatusLabel(selectedStatus)}
                  <AngleDownSVG className="ml-[70%]" fill="#2563eb" />
                </button>

                {/* 드롭다운 목록 */}
                {isDropdownOpen && (
                  <div className="absolute mt-1 w-full bg-white text-black rounded-md shadow-lg z-10">
                    <button
                      className="block my-1 p-4 w-full text-left hover:bg-blue-300 hover:text-white rounded-md"
                      onClick={() =>
                        handleStatusChange(CabinetStatus.AVAILABLE)
                      }
                    >
                      사용 가능
                    </button>
                    <button
                      className="block my-1 p-4 w-full text-left hover:bg-blue-300 hover:text-white rounded-md"
                      onClick={() => handleStatusChange(CabinetStatus.BROKEN)}
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
                text={"잠금"}
                className={`w-32 h-10 border text-blue-600 border-blue-600 rounded-lg hover:bg-blue-300 ${
                  selectedBrokenReason === "잠금"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
                onClick={() => handleReasonClick("잠금")}
              />
              <SubmitAndNavigateButton
                text={"파손"}
                className={`w-32 h-10 border text-blue-600 border-blue-600 rounded-lg hover:bg-blue-300 ${
                  selectedBrokenReason === "파손"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
                onClick={() => handleReasonClick("파손")}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <button
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            onClick={handleSave}
          >
            저장
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-100"
            onClick={() => setModalCancelState(false)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStateManagementModal;
