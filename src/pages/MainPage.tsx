import { useBuildingState } from "@/hooks/useBuildingState";
import { useBuildingList } from "@/hooks/useBuildingList";
import { useCabinetState } from "@/hooks/useCabinetState";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import BuildingSelectButton from "@/components/BuildingSelectButton";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import CabinetButtonComponent from "@/components/Cabinet/CabinetButtonComponent";
import CabinetStatusInformation from "@/components/Cabinet/CabinetStatusInformation";

const MainPage = () => {
  // 건물 목록 hooks
  const { buildings } = useBuildingList();

  // 건물, 층수 버튼, dropdown 관련 hooks
  const {
    selectedBuilding,
    setSelectedBuilding,
    selectedFloor,
    setSelectedFloor,
    isOpen,
    setIsOpen,
  } = useBuildingState();

  const { selectedCabinet, setSelectedCabinet } = useCabinetState();

  return (
    <div>
      {/* 상단 네비게이션바 */}
      <SideNavigationLayout
        buildings={buildings}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        setSelectedFloor={setSelectedFloor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex flex-col pt-20">
        {/* 건물 정보(좌측) */}
        <BuildingSelectButton
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
        />
        {/* 하단 메뉴(좌측) */}
        <CabinetFooterMenuButton />
      </div>

      {/* 사물함 위치(중앙) */}
      <div className="absolute inset-y-0 left-64 right-80 border-r-2 border-gray-400 pt-20 hidden sl:block flex-col">
        {/* 건물 선택 후, 층수 선택을 둘 다 해야 사물함 컴포넌트가 보임 */}
        {selectedBuilding !== null && selectedFloor !== null && (
          <CabinetButtonComponent
            rows={4}
            columns={12}
            selectedBuilding={buildings[selectedBuilding]}
            selectedFloor={buildings[selectedBuilding]?.floors[selectedFloor]}
            setSelectedCabinet={setSelectedCabinet}
          />
        )}
        <CabinetStatusInformation />
      </div>

      {/* 선택한 사물함 정보(우측) -> 추후 사물함 컴포넌트와 연결 */}
      <SelectedCabinetInformation selectedCabinet={selectedCabinet} />
    </div>
  );
};

export default MainPage;
