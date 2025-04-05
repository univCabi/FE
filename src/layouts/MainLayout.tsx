import { Outlet } from "react-router";
import { SideNavigationLayoutContext } from "@/contexts/SideNavigationLayoutContext";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useBuildingState } from "@/hooks/useBuildingState";

const MainLayout = () => {
  const { buildingList, selectedBuilding, setSelectedBuilding } =
    useBuildingState();
  const { isLoading } = useAuthRedirect();

  if (isLoading) return <></>;
  return (
    <>
      <SideNavigationLayoutContext.Provider
        value={{
          buildingList,
          selectedBuilding,
          setSelectedBuilding,
        }}
      >
        {/* 상단 네비게이션 바 */}
        <SideNavigationLayout />
        {/* 페이지별 콘텐츠 */}
        <main>
          <Outlet />
        </main>
      </SideNavigationLayoutContext.Provider>
    </>
  );
};

export default MainLayout;
