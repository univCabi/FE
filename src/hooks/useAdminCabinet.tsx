import { useState } from "react";

export const useAdminCabinet = () => {
  const [selectedMultiCabinets, setSelectedMultiCabinets] = useState<number[]>(
    [],
  );
  const [multiButtonActive, setMultiButtonActive] = useState(false);
  const [openStateManagementModal, setOpenStateManagementModal] =
    useState(false);

  return {
    selectedMultiCabinets,
    setSelectedMultiCabinets,
    multiButtonActive,
    setMultiButtonActive,
    openStateManagementModal,
    setOpenStateManagementModal,
  };
};
