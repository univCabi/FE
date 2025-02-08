import { Outlet } from "react-router";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinet } from "@/hooks/useCabinet";

const MainLayout = () => {
  const {
    buildingList,
    selectedBuilding,
    setSelectedFloor,
  } = useBuildingState();
  const { setSelectedCabinet } = useCabinet();
  return (
    <>
      {/* 상단 네비게이션 바 */}
      <SideNavigationLayout
        buildingList={buildingList}
        selectedBuilding={selectedBuilding}
        setSelectedFloor={setSelectedFloor}
        setSelectedCabinet={setSelectedCabinet}
      />
      {/* 페이지별 콘텐츠 */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
