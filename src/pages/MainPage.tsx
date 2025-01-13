import { useLocation } from "react-router";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useBuildingList } from "@/hooks/useBuildingList";
import { useCabinetState } from "@/hooks/useCabinetState";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import BuildingSelectButton from "@/components/BuildingSelectButton";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import CabinetButtonLayout from "@/components/Cabinet/CabinetButtonLayout";
import CabinetStatusInformation from "@/components/Cabinet/CabinetStatusInformation";

const MainPage = () => {
  // 건물 목록 hooks
  const { buildingList } = useBuildingList();

  // 건물, 층수 버튼, dropdown 관련 hooks
  const {
    selectedBuilding,
    setSelectedBuilding,
    selectedFloor,
    setSelectedFloor,
  } = useBuildingState();
  const {
    selectedCabinet,
    setSelectedCabinet,
    selectedStatus,
    setSelectedStatus,
    expiredAt,
    setExpiredAt,
    isMyCabinet,
    setIsMyCabinet,
  } = useCabinetState();

  const location = useLocation();
  const filteredCabinetDetail = location.state?.filteredCabinetDetail;

  return (
    <>
      {/* 상단 네비게이션바(화면 크기 상관없이 표시) */}
      <SideNavigationLayout
        buildingList={buildingList}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        setSelectedFloor={setSelectedFloor}
        setSelectedCabinet={setSelectedCabinet}
      />

      {/* 화면 크기 = 768px 이상일 때 */}
      <div className="md:flex">
        {/* 건물 정보(좌측) */}
        <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 hidden md:flex">
          <BuildingSelectButton
            buildingList={buildingList}
            selectedBuilding={selectedBuilding}
            setSelectedBuilding={setSelectedBuilding}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
            setSelectedCabinet={setSelectedCabinet}
            selectedCabinet={selectedCabinet}
            filteredCabinetDetail={filteredCabinetDetail}
          />

          {/* 하단 메뉴(좌측) */}
          <CabinetFooterMenuButton />
        </div>

        {/* 사물함 위치(중앙) */}
        <div className="absolute inset-y-0 left-0 right-0 md:left-64 md:right-80 border-gray-400 pt-16 hidden md:flex">
          {/* 건물 선택 후, 층수 선택을 둘 다 해야 사물함 컴포넌트가 보임 */}
          {selectedBuilding !== null && selectedFloor !== null && (
            <>
              <CabinetButtonLayout
                selectedBuilding={
                  buildingList.find(
                    (building) => building.name === selectedBuilding
                  ) || null
                }
                selectedFloor={selectedFloor}
                selectedCabinet={selectedCabinet}
                setSelectedCabinet={setSelectedCabinet}
                setSelectedStatus={setSelectedStatus}
                isMyCabinet={isMyCabinet}
                setIsMyCabinet={setIsMyCabinet}
                filteredCabinetDetail={filteredCabinetDetail}
              />
              <CabinetStatusInformation />
            </>
          )}
        </div>
        {/* 선택한 사물함 정보(우측) */}
        <div className="absolute inset-y-0 right-0 w-80 border-gray-400 border-l-2 pt-20 hidden md:flex">
          <SelectedCabinetInformation
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedCabinet={selectedCabinet}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            setExpiredAt={setExpiredAt}
            setSelectedCabinet={setSelectedCabinet}
            expiredAt={expiredAt}
            isMyCabinet={isMyCabinet}
            setIsMyCabinet={setIsMyCabinet}
          />
        </div>
      </div>

      {/* 화면 크기 = 768px 이하일 때 */}
      <div className="md:hidden">
        {/* 건물 & 층 선택 안했을 때 -> 건물 & 층 선택하는 컴포넌트만 표시 */}
        {selectedFloor === null && (
          <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex">
            <BuildingSelectButton
              buildingList={buildingList}
              selectedBuilding={selectedBuilding}
              setSelectedBuilding={setSelectedBuilding}
              selectedFloor={selectedFloor}
              setSelectedFloor={setSelectedFloor}
              setSelectedCabinet={setSelectedCabinet}
              selectedCabinet={selectedCabinet}
              filteredCabinetDetail={filteredCabinetDetail}
            />
            {/* 하단 메뉴(좌측) */}
            <CabinetFooterMenuButton />
          </div>
        )}

        {/* 건물&층 선택 완료 -> 사물함 컴포넌트 표시 */}
        {selectedBuilding !== null && selectedFloor !== null && (
          <div
            className={`absolute inset-y-0 left-0 right-0 border-gray-400 pt-16 flex ${
              selectedCabinet ? "w-8/12" : "w-full"
            }`}
          >
            <>
              <div className="absolute inset-y-0 left-12 right-8 pt-16">
                <CabinetButtonLayout
                  selectedBuilding={
                    buildingList.find(
                      (building) => building.name === selectedBuilding
                    ) || null
                  }
                  selectedFloor={selectedFloor}
                  selectedCabinet={selectedCabinet}
                  setSelectedCabinet={setSelectedCabinet}
                  setSelectedStatus={setSelectedStatus}
                  isMyCabinet={isMyCabinet}
                  setIsMyCabinet={setIsMyCabinet}
                  filteredCabinetDetail={filteredCabinetDetail}
                />
              </div>
              {/* 화면 크기 = 768px 이하일 때 사물함 정보 숨김 */}
              <div className="hidden sl:flex">
                <CabinetStatusInformation />
              </div>
            </>
          </div>
        )}

        {/* 사물함 선택 완료 -> cabinetRental 컴포넌트 표시 */}
        {selectedCabinet && (
          <div className="absolute inset-y-0 right-0 w-80 border-gray-400 border-l-2 pt-20 flex">
            <SelectedCabinetInformation
              selectedBuilding={selectedBuilding}
              selectedFloor={selectedFloor}
              selectedCabinet={selectedCabinet}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              setExpiredAt={setExpiredAt}
              setSelectedCabinet={setSelectedCabinet}
              expiredAt={expiredAt}
              isMyCabinet={isMyCabinet}
              setIsMyCabinet={setIsMyCabinet}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
