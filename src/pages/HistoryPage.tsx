import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearchInput } from "@/hooks/useSearchInput";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useHistoryData } from "@/hooks/useHistoryData";
import HistoryList from "@/components/HistoryList";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SideNavigationLayout from "@/pages/SideNavigationLayout";

const HistoryPage = () => {
  const { userHistoryData } = useHistoryData();
  const { buildings } = useBuildingList();
  const {
    selectedBuilding,
    setSelectedBuilding,
    setSelectedFloor,
    isOpen,
    setIsOpen,
  } = useBuildingState();
  const { searchInput, setSearchInput } = useSearchInput();

  return (
    <div>
      <SideNavigationLayout
        buildings={buildings}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        setSelectedFloor={setSelectedFloor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchInput={searchInput} // 추가
        setSearchInput={setSearchInput} // 추가
      />

      {/* 건물 정보(좌측) */}
      <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex-col pt-20 hidden md:flex">
        {/* 하단 메뉴(좌측) */}
        <CabinetFooterMenuButton />
      </div>
      <div className="flex flex-col  items-center justify-center h-screen pt-20">
        <div className="text-black text-4xl font-bold text-center hidden md:block">
          사물함 대여 기록
        </div>
        <div className=" max-w-[60rem] w-[70%] h-[95%] md:h-[85%]  bg-gray-100 mt-5 border rounded-xl  shadow-lg">
          <HistoryList userHistoryData={userHistoryData} />
        </div>
      </div>
    </div>
  );
};
export default HistoryPage;
