// 사물함 배열 관련
import { useCallback, useEffect } from "react";
import {
  CabinetDetailInfo,
  SelectedCabinet,
  StatusData,
} from "@/types/CabinetType";
import { SelectedMultiCabinetsData } from "@/types/MultiCabinetType";
import AdminAllSelectButton from "@/components/Admin/Cabinet/AdminAllSelectButton";
import CabinetStatusInformation from "@/components/Cabinet/CabinetStatusInformation";
import CabinetButtonSkeleton from "@/components/Skeleton/CabinetButtonSkeleton";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useAdminCabinet } from "@/hooks/useAdminCabinet";
import { useCabinet } from "@/hooks/useCabinet";
import { useCabinetActivation } from "@/hooks/useCabinetActivation";

interface AdminCabinetLayoutProps
  extends CabinetDetailInfo,
    SelectedMultiCabinetsData {
  selectedStatus: string;
  setSelectedMultiCabinets: React.Dispatch<
    React.SetStateAction<StatusData[] | null>
  >;
  setIsMultiButtonActive: (value: boolean) => void;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
  setIsAdminCabinetInfoVisible: (value: boolean) => void;
}

const AdminCabinetLayout = ({
  selectedBuilding,
  selectedFloor,
  filteredCabinetDetail,
  fetchCabinetDetailInformation,
  selectedMultiCabinets,
  setSelectedMultiCabinets,
  isMultiButtonActive,
  setIsMultiButtonActive,
  setSelectedCabinet,
  selectedStatus,
  isMyCabinet,
  setIsAdminCabinetInfoVisible,
}: AdminCabinetLayoutProps) => {
  const { getStatusColor } = useCabinet();
  const { cabinetData, isLoading, fetchCabinetData } = useCabinetActivation({
    selectedBuilding,
    selectedFloor,
    isMyCabinet,
  });
  const { checkedCabinet, setCheckedCabinet } = useAdminCabinet();
  const MAX_CABINETS = 47; // Cabinet 배열의 최대 길이

  // 복수선택기능 버튼 활성화
  const MultipleSelectButtonActive = useCallback(() => {
    {
      isMultiButtonActive
        ? setIsMultiButtonActive(false)
        : setIsMultiButtonActive(true);
    }
  }, [isMultiButtonActive]);

  const handleCabinetClick = (
    cabinetNumber: number,
    id: number,
    status: string,
  ) => {
    const selectedMultiCabinet: StatusData = {
      cabinetNumber,
      id,
      status,
    };
    if (!isMultiButtonActive) {
      setSelectedMultiCabinets([selectedMultiCabinet]);
      return;
    } else {
      setSelectedMultiCabinets((prevSelectedCabinets) => {
        const currentSelection = prevSelectedCabinets ?? [];
        const newSelection = currentSelection.some(
          (cabinet) => cabinet.cabinetNumber === cabinetNumber,
        )
          ? currentSelection.filter(
              (cabinet) => cabinet.cabinetNumber !== cabinetNumber,
            )
          : [...currentSelection, selectedMultiCabinet];
        return newSelection;
      });
    }
  };

  // 전체선택
  const handleSelectAllCabinets = () => {
    if (checkedCabinet) {
      setSelectedMultiCabinets(null);
      setIsAdminCabinetInfoVisible(false); // 전체 해제 시 사물함 정보 숨김
    } else {
      setSelectedMultiCabinets(
        cabinetData.map((cabinet) => ({
          cabinetNumber: cabinet.cabinetNumber,
          id: cabinet.id,
          status: cabinet.status,
        })),
      );
      setIsAdminCabinetInfoVisible(true); // 전체 선택 시 사물함 정보 표시
    }
    setCheckedCabinet(!checkedCabinet);
  };

  useEffect(() => {
    setSelectedMultiCabinets([]);
    setSelectedCabinet(null);
    if (!isMultiButtonActive) {
      setCheckedCabinet(false);
    }
  }, [isMultiButtonActive, selectedBuilding, selectedFloor]);

  // Return, status 변경 시 cabinetCallApi 호출
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      if (selectedBuilding !== null && selectedFloor !== null) {
        fetchCabinetData(selectedBuilding, selectedFloor);
      }
      if (selectedMultiCabinets === null) {
        setCheckedCabinet(false); // 전체 선택 해제
      }
    }
  }, [
    selectedBuilding,
    selectedFloor,
    selectedStatus,
    checkedCabinet &&
      selectedMultiCabinets &&
      selectedMultiCabinets.length === MAX_CABINETS, // 전체선택
  ]);

  // 검색 결과에 해당하는 사물함이 있을 경우에만 실행
  useEffect(() => {
    if (filteredCabinetDetail) {
      fetchCabinetDetailInformation(
        filteredCabinetDetail.id,
        filteredCabinetDetail.cabinetNumber,
      );
    }
  }, [filteredCabinetDetail]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-end">
        <SubmitAndNavigateButton
          text={"복수 선택 기능"}
          className={`flex-col mt-4 mr-3 w-28 h-8 border border-blue-600 rounded-md transition-all duration-150 z-10 ${
            isMultiButtonActive
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-200"
          }`}
          onClick={MultipleSelectButtonActive}
        />
        <AdminAllSelectButton
          selectedMultiCabinets={selectedMultiCabinets}
          isMultiButtonActive={isMultiButtonActive}
          handleSelectAllCabinets={handleSelectAllCabinets}
          cabinetData={cabinetData}
        />
      </div>

      <div className="h-[74%] flex items-center justify-center">
        {isLoading ? (
          <CabinetButtonSkeleton />
        ) : (
          <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[100%] z-10">
            {cabinetData.map((cabinet) => {
              const isSelected = selectedMultiCabinets?.some(
                (selected) => selected.cabinetNumber === cabinet.cabinetNumber,
              );
              return (
                <button
                  key={cabinet.cabinetNumber}
                  className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2 
                  ${
                    isSelected
                      ? `${getStatusColor(cabinet.status, cabinet.isMine)} opacity-100 shadow-md`
                      : `${getStatusColor(cabinet.status, cabinet.isMine)} ${isMultiButtonActive ? "opacity-35" : ""}`
                  }
                  `}
                  style={{
                    top: `${350 - cabinet.cabinetYPos * 100}px`,
                    left: `${cabinet.cabinetXPos * 90}px`,
                  }}
                  onClick={() => {
                    fetchCabinetDetailInformation(
                      cabinet.id,
                      cabinet.cabinetNumber,
                    );
                    handleCabinetClick(
                      cabinet.cabinetNumber,
                      cabinet.id,
                      cabinet.status,
                    );
                  }}
                >
                  {cabinet.cabinetNumber}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="hidden sl:flex">
        <CabinetStatusInformation />
      </div>
    </div>
  );
};

export default AdminCabinetLayout;
