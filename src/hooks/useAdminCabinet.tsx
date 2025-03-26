import { useState } from "react";
import "@/types/CabinetType";
import { StatusData } from "@/types/CabinetType";

export const useAdminCabinet = () => {
  const [selectedMultiCabinets, setSelectedMultiCabinets] = useState<
    StatusData[] | null
  >(null); // 사물함 복수 선택
  const [isMultiButtonActive, setIsMultiButtonActive] = useState(false);
  const [openStateManagementModal, setOpenStateManagementModal] =
    useState(false); // 상태관리 모달
  const [checkedCabinet, setCheckedCabinet] = useState(false); // 전체선택 여부 나타내는 변수

  return {
    selectedMultiCabinets,
    setSelectedMultiCabinets,
    isMultiButtonActive,
    setIsMultiButtonActive,
    openStateManagementModal,
    setOpenStateManagementModal,
    checkedCabinet,
    setCheckedCabinet,
  };
};
