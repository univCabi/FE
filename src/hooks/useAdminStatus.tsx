import { useState } from "react";
import { SelectedMultiCabinetsData } from "@/types/MultiCabinetType";

interface useAdminStatusProps extends SelectedMultiCabinetsData {
  selectedStatus: string;
}

export const useAdminStatus = ({
  isMultiButtonActive,
  selectedMultiCabinets,
  selectedStatus,
}: useAdminStatusProps) => {
  const [selectedBrokenReason, setSelectedBrokenReason] = useState<
    string | null
  >(null); // 고장 이유 선택

  const handleReasonClick = (reason: string) => {
    setSelectedBrokenReason(reason);
  };

  // status 추가 시 아래 STATUS_CATEGORIES에 추가
  const STATUS_CATEGORIES = {
    returnable: ["USING", "OVERDUE"],
    manageable: ["AVAILABLE", "BROKEN"],
  };

  const hasStatus = (category: string[], status: string) =>
    isMultiButtonActive
      ? selectedMultiCabinets?.some((cabinet) =>
          category.includes(cabinet.status),
        ) || false
      : category.includes(status);

  const showsReturnButton = hasStatus(
    STATUS_CATEGORIES.returnable,
    selectedStatus,
  );
  const showsStatusManagementButton = hasStatus(
    STATUS_CATEGORIES.manageable,
    selectedStatus,
  );

  return {
    selectedBrokenReason,
    setSelectedBrokenReason,
    handleReasonClick,
    showsReturnButton,
    showsStatusManagementButton,
  };
};
