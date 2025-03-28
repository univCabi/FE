import { CabinetInfo, SelectedCabinet, StatusData } from "@/types/CabinetType";
import { SelectedMultiCabinetsData } from "@/types/MultiCabinetType";
import { formatDate } from "@/utils/formatDate";
import CabinetActionButtons from "@/components/Cabinet/CabinetActionButtons";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import CabinetSVG from "@/icons/cabinet.svg?react";

interface AdminCabinetInformationDisplayProps
  extends CabinetInfo,
    SelectedMultiCabinetsData {
  username: string | null;
  clickedReturnButton: () => void;
  clickedStateManagementButton: () => void;
  cancelButton: () => void;
  expiredAt: string | null;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCabinet: SelectedCabinet | null;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  setSelectedMultiCabinets: React.Dispatch<
    React.SetStateAction<StatusData[] | null>
  >;
  closeReturnModal: () => void;
}

const AdminCabinetInformationDisplay = ({
  selectedBuilding,
  selectedFloor,
  selectedCabinet,
  username,
  expiredAt,
  selectedMultiCabinets,
  isMultiButtonActive,
  clickedReturnButton,
  clickedStateManagementButton,
  cancelButton,
  selectedStatus,
  setSelectedCabinet,
  setSelectedStatus,
  setSelectedMultiCabinets,
  closeReturnModal,
}: AdminCabinetInformationDisplayProps) => {
  const { showsReturnButton, showsStatusManagementButton } = useAdminStatus({
    selectedStatus,
    setSelectedStatus,
    selectedCabinet,
    isMultiButtonActive,
    selectedMultiCabinets,
    setSelectedCabinet,
    setSelectedMultiCabinets,
    closeReturnModal,
  });
  return (
    <>
      <div className="text-center w-[17rem]">
        <div className="pb-5 flex justify-center">
          <CabinetSVG />
        </div>
        <h2 className="font-bold text-xl w-full break-all">
          {selectedBuilding} {selectedFloor}F {""}
          {isMultiButtonActive && selectedMultiCabinets?.length ? (
            <>
              <br />
              {selectedMultiCabinets
                ?.map((cabinet) => cabinet.cabinetNumber)
                .sort((a, b) => a - b)
                .join(",")}
              번
            </>
          ) : (
            selectedCabinet && `${selectedCabinet.cabinetNumber}번`
          )}
        </h2>
      </div>

      {/* selectedMultCabinets 배열에 데이터에서 using or overude가 있고, available or broken이 하나라도 없다면 반납 버튼 활성화 */}
      {showsReturnButton && !showsStatusManagementButton && (
        <>
          <CabinetActionButtons
            onReturnClick={clickedReturnButton}
            onStateManagementClick={clickedStateManagementButton}
            onCancelClick={cancelButton}
            text="반납"
            stateManagementText="상태 관리"
          />
          <div className="text-lg">
            {isMultiButtonActive === false ? ( // multiButton이 비활성화일 때만 사용자, 반납기한 표시 -> 활성화되면 여러 사물함의 사용자, 반납기한이 큰 의미없기 때문
              <>
                <p>
                  사용자: <strong>{username}</strong>
                </p>
                <p>
                  반납 기한: <strong>{formatDate(expiredAt)}</strong>
                </p>
              </>
            ) : null}
          </div>
        </>
      )}

      {/* selectedMultCabinets 배열에 데이터에서 available or broken이 하나라도 있으면 상태관리 버튼만 활성화 */}
      {showsStatusManagementButton && (
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
