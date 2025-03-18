import CabinetActionButtons from "@/components/Cabinet/CabinetActionButtons";
import CabinetSVG from "@/icons/cabinet.svg?react";

interface CabinetInformationDisplayProps {
  selectedBuilding: string | null;
  selectedFloor: number | null;
  selectedCabinet: number | null;
  selectedMultiCabinets: number[];
  multiButtonActive: boolean;
  clickedReturnButton: () => void;
  clickedStateManagementButton: () => void;
  cancelButton: () => void;
  username: string | null;
  expiredAt: string | null;
  selectedStatus: string;
}

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

const AdminCabinetInformationDisplay = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
  selectedMultiCabinets,
  multiButtonActive,
  clickedReturnButton,
  clickedStateManagementButton,
  cancelButton,
  username,
  expiredAt,
  selectedStatus,
}: CabinetInformationDisplayProps) => {
  return (
    <>
      <div className="text-center w-[17rem]">
        <div className="pb-5 flex justify-center">
          <CabinetSVG />
        </div>
        <h2 className="font-bold text-xl w-full break-all">
          {selectedBuilding} {selectedFloor}F {""}
          {multiButtonActive && selectedMultiCabinets.length > 0 ? (
            <>
              <br />
              {selectedMultiCabinets.sort((a, b) => a - b).join(",")}번
            </>
          ) : (
            selectedCabinet && `${selectedCabinet}번`
          )}
        </h2>
      </div>

      {(selectedStatus === "USING" || selectedStatus === "OVERDUE") && (
        <>
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
        </>
      )}
      {(selectedStatus === "AVAILABLE" || selectedStatus === "BROKEN") && (
        <CabinetActionButtons
          onStateManagementClick={clickedStateManagementButton}
          onCancelClick={cancelButton}
          stateManagementText="상태 관리"
        />
      )}
    </>
  );
};

export default AdminCabinetInformationDisplay;
