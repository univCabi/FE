import { useState } from "react";
import { SelectedMultiCabinetsData } from "@/types/AdminType";
import "@/types/CabinetType";

interface useAdminCabinetProps {
  selectedStatus: string;
}

export const useAdminCabinet = ({ selectedStatus }: useAdminCabinetProps) => {
  const [selectedMultiCabinets, setSelectedMultiCabinets] = useState<
    SelectedMultiCabinetsData[] | null
  >(null); // 사물함 복수 선택
  const [isMultiButtonActive, setIsMultiButtonActive] = useState(false);
  const [openStateManagementModal, setOpenStateManagementModal] =
    useState(false); // 상태관리 모달
  const [checkedCabinet, setCheckedCabinet] = useState(false); // 전체선택 여부 나타내는 변수
  const [selectedBrokenReason, setSelectedBrokenReason] = useState<
    string | null
  >(null); // 고장 이유 선택

  const handleReasonClick = (reason: string) => {
    setSelectedBrokenReason(reason);
  };

  const hasUsingOrOverdue = isMultiButtonActive
    ? selectedMultiCabinets?.some(
        (cabinet) => cabinet.status === "USING" || cabinet.status === "OVERDUE",
      ) || false
    : selectedStatus === "USING" || selectedStatus === "OVERDUE";

  const hasAvailableOrBroken = isMultiButtonActive
    ? selectedMultiCabinets?.some(
        (cabinet) =>
          cabinet.status === "AVAILABLE" || cabinet.status === "BROKEN",
      ) || false
    : selectedStatus === "AVAILABLE" || selectedStatus === "BROKEN";

  return {
    selectedMultiCabinets,
    setSelectedMultiCabinets,
    isMultiButtonActive,
    setIsMultiButtonActive,
    openStateManagementModal,
    setOpenStateManagementModal,
    checkedCabinet,
    setCheckedCabinet,
    selectedBrokenReason,
    setSelectedBrokenReason,
    handleReasonClick,
    hasUsingOrOverdue,
    hasAvailableOrBroken,
  };
};
