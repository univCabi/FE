import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearchInput } from "@/hooks/useSearchInput";
import { useBuildingState } from "@/hooks/useBuildingState";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SideNavigationLayout from "@/pages/SideNavigationLayout";

const SearchPage = () => {
  const { buildings } = useBuildingList();
  const {
    selectedBuilding,
    setSelectedBuilding,
    setSelectedFloor,
    isOpen,
    setIsOpen,
  } = useBuildingState();
  const { searchInput, setSearchInput, filteredBuildings } = useSearchInput();

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

      {/* 검색 결과 */}
      <div className="ml-40 p-20">
        {filteredBuildings.map((building, index) => (
          <div key={index}>{building.name}</div>
        ))}
      </div>
    </div>
  );
};
export default SearchPage;
