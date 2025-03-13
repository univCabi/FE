import { useState } from "react";

export const useAdminCabinet = () => {
  const [selectedMultiCabinets, setSelectedMultiCabinets] = useState<number[]>(
    [],
  ); // 사물함 복수 선택
  const [multiButtonActive, setMultiButtonActive] = useState(false);
  const [openStateManagementModal, setOpenStateManagementModal] =
    useState(false); // 상태관리 모달
  const [checkedCabinet, setCheckedCabinet] = useState(false); // 전체선택 여부 나타내는 변수
  const [selectedBrokenReason, setSelectedBrokenReason] = useState<
    string | null
  >(null); // 고장 이유 선택

  const handleReasonClick = (reason: string) => {
    setSelectedBrokenReason(reason);
  };

  return {
    selectedMultiCabinets,
    setSelectedMultiCabinets,
    multiButtonActive,
    setMultiButtonActive,
    openStateManagementModal,
    setOpenStateManagementModal,
    checkedCabinet,
    setCheckedCabinet,
    selectedBrokenReason,
    setSelectedBrokenReason,
    handleReasonClick,
  };
};
