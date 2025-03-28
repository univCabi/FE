import { useEffect, useState } from "react";
import { SelectedCabinet, StatusData } from "@/types/CabinetType";
import { SelectedMultiCabinetsData } from "@/types/MultiCabinetType";
import { CabinetStatus, CabinetStatusType } from "@/types/StatusEnum";
import { log } from "@/utils/logger";
import { adminChangeStatusApi } from "@/api/adminChangeStatusApi";
import { useAdminReturn } from "./useAdminReturn";

interface useAdminStatusProps extends SelectedMultiCabinetsData {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCabinet: SelectedCabinet | null;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  setSelectedMultiCabinets: React.Dispatch<
    React.SetStateAction<StatusData[] | null>
  >;
  closeReturnModal: () => void;
}

export const useAdminStatus = ({
  selectedStatus,
  setSelectedStatus,
  selectedCabinet,
  isMultiButtonActive,
  selectedMultiCabinets,
  setSelectedCabinet,
  setSelectedMultiCabinets,
  closeReturnModal,
}: useAdminStatusProps) => {
  const [selectedBrokenReason, setSelectedBrokenReason] = useState<
    string | null
  >(null);
  const [newStatus, setNewStatus] = useState<string>();

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

  // 반납, 상태관리 버튼과 관련된 조건
  // status 추가 시 아래 STATUS_CATEGORIES에 추가
  const STATUS_CATEGORIES = {
    returnable: [CabinetStatus.USING, CabinetStatus.OVERDUE],
    manageable: [CabinetStatus.AVAILABLE, CabinetStatus.BROKEN],
    available: [
      CabinetStatus.AVAILABLE,
      CabinetStatus.USING,
      CabinetStatus.OVERDUE,
    ],
    breakable: [CabinetStatus.BROKEN],
  };

  const hasStatus = (category: string[]) =>
    isMultiButtonActive
      ? selectedMultiCabinets?.some((cabinet) =>
          category.includes(cabinet.status),
        )
      : category.includes(selectedStatus);

  const showsReturnButton = hasStatus(STATUS_CATEGORIES.returnable);
  const showsStatusManagementButton = hasStatus(STATUS_CATEGORIES.manageable);
  const hasAvailable = hasStatus(STATUS_CATEGORIES.available);
  const hasBroken = hasStatus(STATUS_CATEGORIES.breakable);

  // 사용 가능, 사용 불가 버튼과 관련된 조건
  const isBroken = selectedStatus === CabinetStatus.BROKEN;
  const isAvailable = selectedStatus === CabinetStatus.AVAILABLE;
  // 아 마지막에 선택된 사물함이 using이 아니라서 실행이 안되는 거엿음! -> 수정하기
  const isUsing = selectedStatus === CabinetStatus.USING;
  const isOverdue = selectedStatus === CabinetStatus.OVERDUE;
  const isNewStatusBroken = newStatus === CabinetStatus.BROKEN;
  const isNewStatusAvailable = newStatus === CabinetStatus.AVAILABLE;

  // Reason 버튼 활성화 조건 (사용 가능 -> 비활성화, 사용 불가 -> 활성화)
  const canSelectedReasonButton =
    (!hasAvailable && isNewStatusBroken) || isNewStatusBroken;

  // 상태관리 API 호출
  const fetchAdminChangeStatus = async (
    newStatus: CabinetStatusType,
    reason: string | null,
  ) => {
    const cabinetIds: number[] = isMultiButtonActive
      ? (selectedMultiCabinets?.map((cabinet) => cabinet.id) ?? [])
      : selectedCabinet
        ? [selectedCabinet.cabinetId]
        : [];

    const test = hasStatus(STATUS_CATEGORIES.returnable);

    if (test) {
      await fetchAdminCabinetReturn();
      console.log("너 뭐야", test);
    }

    // using -> 나머지: 실행 XXXXX
    setNewStatus(selectedStatus);
    try {
      const response = await adminChangeStatusApi(
        cabinetIds,
        newStatus,
        reason,
      );
      if (response) {
        setSelectedStatus(response.data.cabinets.status);
        setSelectedBrokenReason(response.data.cabinets.reason);
        setSelectedMultiCabinets(null);
        setSelectedCabinet(null);
        console.log(response.data);
        log.info(
          `API 호출 성공: adminChangeStatusApi, ${JSON.stringify(response, null, 2)}`,
        );

        return response.data;
      }
    } catch (error) {
      log.error("API 호출 중 에러 발생: adminChangeStatusApi");
    }
  };

  // 사물함 단일 선택
  const getStatusLabel = (status?: string) => {
    return status === CabinetStatus.BROKEN ? "사용 불가" : "사용 가능";
  };

  // 사물함 복수 선택
  const getMultiCabinetStatusLabel = () => {
    if (isMultiButtonActive) {
      if (isNewStatusAvailable) return "사용 가능";
      if (isNewStatusBroken) return "사용 불가";
    }
    if (isAvailable || isBroken || isUsing || isOverdue) return "상태 선택";
  };

  // 고장 이유 선택
  const handleReasonClick = (reason: string | null) => {
    setSelectedBrokenReason(reason);
  };

  // 상태 저장
  const handleStatusSave = (
    newStatus: CabinetStatusType,
    reason: string | null,
  ) => {
    fetchAdminChangeStatus(newStatus, reason);
  };

  useEffect(() => {
    if (newStatus !== CabinetStatus.BROKEN) {
      setSelectedBrokenReason(null); // 선택 취소
    }
  }, [newStatus]); // newStatus 변경될 때 실행

  return {
    showsReturnButton,
    showsStatusManagementButton,
    isBroken,
    isNewStatusAvailable,
    isNewStatusBroken,
    canSelectedReasonButton,
    selectedBrokenReason,
    setSelectedBrokenReason,
    newStatus,
    setNewStatus,
    fetchAdminChangeStatus,
    getStatusLabel,
    getMultiCabinetStatusLabel,
    handleStatusSave,
    handleReasonClick,
  };
};
