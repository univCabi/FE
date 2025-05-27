import { useEffect, useState } from "react";
import { SelectedCabinet, StatusData } from "@/types/CabinetType";
import { SelectedMultiCabinetsData } from "@/types/MultiCabinetType";
import {
  BrokenReasonType,
  CabinetStatus,
  CabinetStatusType,
} from "@/types/StatusEnum";
import { log } from "@/utils/logger";
import { adminChangeStatusApi } from "@/api/adminChangeStatusApi";
import { useAdminReturn } from "@/hooks/Admin/useAdminReturn";

interface useAdminStatusProps extends SelectedMultiCabinetsData {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCabinet: SelectedCabinet | null;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  setSelectedMultiCabinets: React.Dispatch<
    React.SetStateAction<StatusData[] | null>
  >;
  closeReturnModal: () => void;
  setModalCancelState: React.Dispatch<React.SetStateAction<boolean>>;
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
  setModalCancelState,
}: useAdminStatusProps) => {
  const [selectedBrokenReason, setSelectedBrokenReason] = useState<
    string | null
  >(null);
  const [newStatus, setNewStatus] = useState<string>();
  const [brokenDate, setBrokenDate] = useState<string | null>(null);
  const [studentNumber, setStudentNumber] = useState<string>("");

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

  // 반납, 상태관리 버튼과 관련된 조건 //
  // status 추가 시 아래 STATUS_CATEGORIES에 추가
  const STATUS_CATEGORIES = {
    returnable: [CabinetStatus.USING, CabinetStatus.OVERDUE],
    manageable: [CabinetStatus.AVAILABLE, CabinetStatus.BROKEN],
    available: [
      CabinetStatus.AVAILABLE,
      CabinetStatus.USING,
      CabinetStatus.OVERDUE,
    ],
  };
  // MultiCabinets 관련
  const hasStatus = (category: string[]) =>
    isMultiButtonActive
      ? selectedMultiCabinets?.some((cabinet) =>
          category.includes(cabinet.status),
        )
      : category.includes(selectedStatus);
  const showsReturnButton = hasStatus(STATUS_CATEGORIES.returnable);
  const showsStatusManagementButton = hasStatus(STATUS_CATEGORIES.manageable);
  const hasAvailable = hasStatus(STATUS_CATEGORIES.available);

  // BROKEN -> 기존 대여 중인 사물함 반납 처리 위한 조건
  const isReturnable =
    selectedStatus === CabinetStatus.USING ||
    selectedStatus === CabinetStatus.OVERDUE;
  // 사용 가능, 사용 불가 버튼과 관련된 조건
  const isManageable =
    selectedStatus === CabinetStatus.BROKEN ||
    selectedStatus === CabinetStatus.AVAILABLE;

  const isAllStatus = isManageable || isReturnable;

  // 선택할 수 있는 드롭다운 항목
  const isNewStatusBroken = newStatus === CabinetStatus.BROKEN;
  const isNewStatusAvailable = newStatus === CabinetStatus.AVAILABLE;
  const isNewStatusUsing = newStatus === CabinetStatus.USING;
  const isNewStatusOverdue = newStatus === CabinetStatus.OVERDUE;

  // reason 버튼 관련 조건
  const canSelectedReasonButton =
    (!hasAvailable && isNewStatusBroken) || isNewStatusBroken;

  // studentNumber 입력 관련 조건
  const isStudentNumberInputActive =
    (!showsStatusManagementButton &&
      (isNewStatusUsing || isNewStatusOverdue)) ||
    isNewStatusOverdue ||
    isNewStatusUsing;
  const isOverDateInputActive =
    (!showsStatusManagementButton && isNewStatusOverdue) || isNewStatusOverdue;

  // 사용 가능, 사용 불가 눌렀을 때 학번 입력 값 초기화
  useEffect(() => {
    if (!isStudentNumberInputActive) {
      setStudentNumber("");
    }
  }, [isStudentNumberInputActive]);

  // 상태관리 API 호출
  const fetchAdminChangeStatus = async (
    newStatus: CabinetStatusType,
    reason?: BrokenReasonType,
    studentNumber?: string,
  ) => {
    const cabinetIds: number[] = isMultiButtonActive
      ? (selectedMultiCabinets?.map((cabinet) => cabinet.id) ?? [])
      : selectedCabinet
        ? [selectedCabinet.cabinetId]
        : [];
    if (isNewStatusBroken) {
      if (isReturnable || showsReturnButton) {
        await fetchAdminCabinetReturn();
      }
    }
    setNewStatus(selectedStatus);
    try {
      let response;

      if (newStatus === CabinetStatus.BROKEN) {
        response = await adminChangeStatusApi({
          cabinetIds,
          newStatus: CabinetStatus.BROKEN,
          reason: reason!, // 반드시 필요
        });
      } else if (
        newStatus === CabinetStatus.USING ||
        newStatus === CabinetStatus.OVERDUE
      ) {
        response = await adminChangeStatusApi({
          cabinetIds,
          newStatus,
          studentNumber: studentNumber!, // 반드시 필요
        });
      } else if (newStatus === CabinetStatus.AVAILABLE) {
        response = await adminChangeStatusApi({
          cabinetIds,
          newStatus: CabinetStatus.AVAILABLE,
        });
      }
      if (response) {
        setSelectedStatus(response.data.cabinets.status);
        setSelectedBrokenReason(response.data.cabinets.reason);
        setBrokenDate(response.data.cabinets.brokenDate);
        setSelectedMultiCabinets(null);
        setSelectedCabinet(null);
        setModalCancelState(false);
        log.info(
          `API 호출 성공: adminChangeStatusApi, ${JSON.stringify(response, null, 2)}`,
        );
        return response.data;
      }
    } catch (error) {
      log.error(`API 호출 중 에러 발생: adminChangeStatusApi ${error}`);
    }
  };

  // 사물함 단일 선택
  const getStatusLabel = (status?: string) => {
    if (status === CabinetStatus.BROKEN) {
      return "사용 불가";
    }
    if (status === CabinetStatus.AVAILABLE) {
      return "사용 가능";
    }
    if (status === CabinetStatus.USING) {
      return "대여";
    }
    if (status === CabinetStatus.OVERDUE) {
      return "연체";
    }
  };

  // 사물함 복수 선택
  const getMultiCabinetStatusLabel = () => {
    if (isMultiButtonActive) {
      if (isNewStatusAvailable) return "사용 가능";
      if (isNewStatusBroken) return "사용 불가";
    }
    if (isAllStatus || selectedMultiCabinets?.length !== null)
      return "상태 선택";
  };

  // 고장 이유 선택
  const handleReasonClick = (reason: string | null) => {
    setSelectedBrokenReason(reason);
  };

  // 상태 저장
  const handleStatusSave = (
    newStatus: CabinetStatusType,
    reason: BrokenReasonType,
    studentNumber: string,
  ) => {
    fetchAdminChangeStatus(newStatus, reason, studentNumber);
  };

  return {
    showsReturnButton,
    showsStatusManagementButton,
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
    brokenDate,
    isStudentNumberInputActive,
    studentNumber,
    setStudentNumber,
    isOverDateInputActive,
  };
};
