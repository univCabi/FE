// 사물함 배열 관련
import { useEffect } from "react";
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
}

const AdminCabinetLayout = ({
  selectedBuilding,
  selectedFloor,
  isMyCabinet,
  filteredCabinetDetail,
  fetchCabinetDetailInformation,
}: AdminCabinetLayoutProps) => {
  const { getStatusColor } = useCabinet();
  const { cabinetData, loading } = useCabinetActivation({
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

  const submitTest = () => {
    console.log("복수 선택 기능 ok");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-end">
        <SubmitAndNavigateButton
          text={"복수 선택 기능"}
          className={
            "flex-col mt-4 w-28 h-8 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-200 hover:text-blue-600 transition-all duration-150"
          }
          // 위에꺼 css 컴포넌트로 ㄱㄱ
          onClick={submitTest}
        />
        <div className="flex items-end mt-2">
          <input
            type="checkbox"
            className="flex-row mr-1 w-4 h-4 appearance-none checked:bg-blue-600 checked:border-0 border border-gray-400 rounded-sm"
          />
          <label className="flex-row text-gray-400">전체 선택</label>
        </div>
      </div>

      {/* <div className="w-full h-[80%] flex items-center justify-center"> */}
      <div className="h-[74%] flex items-center justify-center">
        {loading ? (
          <CabinetButtonSkeleton />
        ) : (
          <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[100%]">
            {cabinetData.map((cabinet) => {
              return (
                <button
                  key={cabinet.cabinetNumber}
                  className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2
                ${getStatusColor(cabinet.status, cabinet.isMine)} 
                
              `}
                  style={{
                    top: `${350 - cabinet.cabinetYPos * 100}px`, // API에서 받은 yPos 사용
                    left: `${cabinet.cabinetXPos * 90}px`, // API에서 받은 xPos 사용
                  }}
                  onClick={() => {
                    fetchCabinetDetailInformation(
                      cabinet.id,
                      cabinet.cabinetNumber,
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
    </div>
  );
};

export default AdminCabinetLayout;
