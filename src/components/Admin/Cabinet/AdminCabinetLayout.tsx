// 사물함 배열 관련
import { useEffect, useState } from "react";
import { SelectedCabinet } from "@/types/CabinetType";
import CabinetButtonSkeleton from "@/components/Skeleton/CabinetButtonSkeleton";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useCabinet } from "@/hooks/useCabinet";
import { useCabinetActivation } from "@/hooks/useCabinetActivation";

interface AdminCabinetLayoutProps {
  selectedBuilding: { building: string } | null;
  selectedFloor: number | null;
  isMyCabinet: boolean;
  filteredCabinetDetail: {
    id: number;
    cabinetNumber: number;
  } | null;
  fetchCabinetDetailInformation: (id: number, cabientNumber: number) => void;
  selectedMultiCabinets: number[];
  setSelectedMultiCabinets: React.Dispatch<React.SetStateAction<number[]>>;
  multiButtonActive: boolean;
  setMultiButtonActive: (value: boolean) => void;
  selectedCabinet: { cabinetId: number; cabinetNumber: number } | null;
  setSelectedCabinet: (cabinet: SelectedCabinet | null) => void;
}

const AdminCabinetLayout = ({
  selectedBuilding,
  selectedFloor,
  isMyCabinet,
  filteredCabinetDetail,
  fetchCabinetDetailInformation,
  selectedMultiCabinets,
  setSelectedMultiCabinets,
  multiButtonActive,
  setMultiButtonActive,
  setSelectedCabinet,
  selectedCabinet,
}: AdminCabinetLayoutProps) => {
  const { getStatusColor } = useCabinet();
  const { cabinetData, loading, setCabinetData } = useCabinetActivation({
    selectedBuilding,
    selectedFloor,
    isMyCabinet,
  });
  // 검색 결과에 해당하는 사물함이 있을 경우에만 실행
  useEffect(() => {
    if (filteredCabinetDetail) {
      fetchCabinetDetailInformation(
        filteredCabinetDetail.id,
        filteredCabinetDetail.cabinetNumber,
      );
    }
  }, [filteredCabinetDetail]);

  const MultipleSelectButtonActive = () => {
    if (multiButtonActive) {
      setMultiButtonActive(false);
    } else {
      setMultiButtonActive(true);
    }
  };

  // 사물함 선택 핸들링
  const handleCabinetClick = (cabinetNumber: number) => {
    if (!multiButtonActive) {
      setSelectedMultiCabinets([cabinetNumber]);
      return;
    }

    // 복수 선택 모드에서는 선택된 상태를 토글
    setSelectedMultiCabinets(
      (prevSelectedCabinet) =>
        prevSelectedCabinet.includes(cabinetNumber)
          ? prevSelectedCabinet.filter((num) => num !== cabinetNumber) // 이미 선택된 경우 제거
          : [...prevSelectedCabinet, cabinetNumber], // 선택되지 않은 경우 추가
    );
    if (multiButtonActive) {
    }
  };

  const [checkedCabinet, setCheckedCabinet] = useState(false); // 전체선택 여부 나타내는 변수
  // 전체선택
  const handleSelectAllCabinets = () => {
    if (checkedCabinet) {
      setSelectedMultiCabinets([]);
    } else {
      setSelectedMultiCabinets(
        cabinetData.map((cabinet) => cabinet.cabinetNumber),
      );
    }
    setCheckedCabinet(!checkedCabinet);
  };

  useEffect(() => {
    setSelectedMultiCabinets([]); // 다중 선택 비활성화 시 초기화
    setSelectedCabinet(null);
    if (!multiButtonActive) {
      setCheckedCabinet(false);
    }
  }, [multiButtonActive, selectedBuilding, selectedFloor]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-end">
        <SubmitAndNavigateButton
          text={"복수 선택 기능"}
          className={`flex-col mt-4 mr-3 w-28 h-8 border border-blue-600 rounded-md transition-all duration-150 z-10 ${
            multiButtonActive
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-blue-200"
          }`}
          onClick={MultipleSelectButtonActive}
        />
        <div className="flex items-end mt-2 mr-3 z-10">
          <input
            key={multiButtonActive ? "active" : "inactive"}
            onChange={() => {
              handleSelectAllCabinets();
            }}
            type="checkbox"
            disabled={!multiButtonActive}
            className={`flex-row mr-1 w-4 h-4 appearance-none border rounded-sm
              ${
                multiButtonActive
                  ? `border-blue-600 checked:bg-blue-600 checked:border-0 ${
                      selectedMultiCabinets.length === cabinetData.length
                        ? "bg-[url('./icons/check.svg')] bg-blue-600"
                        : selectedMultiCabinets.length > 0 &&
                            selectedMultiCabinets.length < cabinetData.length
                          ? "bg-[url('/src/icons/eachCheck.svg')] bg-blue-600"
                          : ""
                    }`
                  : "border-gray-400 checked:bg-transparent checked:border-gray-400"
              }
            `}
            style={
              multiButtonActive
                ? {
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          />
          <label
            className={`flex-row ${
              multiButtonActive ? "text-blue-600" : "text-gray-400"
            }`}
          >
            전체 선택
          </label>
        </div>
      </div>

      <div className="h-[74%] flex items-center justify-center">
        {loading ? (
          <CabinetButtonSkeleton />
        ) : (
          <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[100%] z-10">
            {cabinetData.map((cabinet) => {
              return (
                <button
                  key={cabinet.cabinetNumber}
                  className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2
                  ${
                    selectedMultiCabinets.includes(cabinet.cabinetNumber)
                      ? `${getStatusColor(cabinet.status, cabinet.isMine)} opacity-100`
                      : `${getStatusColor(cabinet.status, cabinet.isMine)} ${multiButtonActive ? "opacity-35" : ""}`
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
                    handleCabinetClick(cabinet.cabinetNumber);
                  }}
                >
                  {cabinet.cabinetNumber}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCabinetLayout;
