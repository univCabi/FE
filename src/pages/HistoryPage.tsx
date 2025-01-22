import { useSearch } from "@/hooks/useSearch";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useHistoryData } from "@/hooks/useHistoryData";
import HistoryList from "@/components/HistoryList";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SideNavigationLayout from "@/components/SideNavigationLayout";

const HistoryPage = () => {
  const { userHistoryData } = useHistoryData();
  const {
    buildingList,
    selectedBuilding,
    setSelectedBuilding,
    setSelectedFloor,
    isDropdownOpen,
    setIsDropdownOpen,
  } = useBuildingState();
  const { searchInput, setSearchInput } = useSearch();

  return (
    <div className="relative h-screen flex flex-col">
      {/* 상단 네비게이션 바 */}
      <header className="sticky top-0 left-0 right-0 h-16 z-10">
        <SideNavigationLayout
          buildingList={buildingList}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
          setSelectedFloor={setSelectedFloor}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </header>

      {/* 메인 레이아웃 */}
      <div className="flex flex-grow">
        {/* 좌측 사이드바 */}
        <aside className="hidden md:flex fixed left-0 top-16 w-40 h-[calc(100%-4rem)] border-r-2 border-gray-400 flex-col bg-white">
          <CabinetFooterMenuButton />
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="ml-0 md:ml-40 flex-grow flex flex-col items-center justify-center">
          {/* 페이지 타이틀 */}
          <div className="text-black text-4xl font-bold text-center ">
            {/* hidden md:block 얘를 지워야하나 말아야하나.. */}
            사물함 대여 기록
          </div>

          {/* 히스토리 리스트 */}
          <div className="max-w-[60rem] w-[70%] max-h-[80vh] h-[90%] bg-gray-100 mt-5 border rounded-xl overflow-y-auto hidden-scrollbar shadow-lg">
            <HistoryList userHistoryData={userHistoryData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;
