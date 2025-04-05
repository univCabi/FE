import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { SideNavigationLayoutContext } from "@/contexts/SideNavigationLayoutContext";
import BuildingSelectButton from "@/components/BuildingSelectButton";
import CabinetButtonLayout from "@/components/Cabinet/CabinetButtonLayout";
import CabinetStatusInformation from "@/components/Cabinet/CabinetStatusInformation";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import { useAvailableCabinet } from "@/hooks/useAvailableCabinet";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinet } from "@/hooks/useCabinet";

const MainPage = () => {
  const { buildingList, selectedBuilding, setSelectedBuilding } = useContext(
    SideNavigationLayoutContext,
  );
  const location = useLocation();
  const filteredCabinetDetail = location.state?.filteredCabinetDetail;
  const { selectedFloor, setSelectedFloor } = useBuildingState();
  const {
    selectedCabinet,
    setSelectedCabinet,
    selectedStatus,
    setSelectedStatus,
    expiredAt,
    setExpiredAt,
    isMyCabinet,
    setIsMyCabinet,
    fetchCabinetDetailInformation,
    setUsername,
    isRentAvailable,
    setIsRentAvailable,
  } = useCabinet();

  const { setCabinetDataByFloor } = useAvailableCabinet();

  useEffect(() => {
    if (location.state?.selectedBuilding) {
      setSelectedBuilding(location.state.selectedBuilding);
      setSelectedFloor(null);
      setSelectedCabinet(null);
    }
  }, [location.state]);

  return (
    <>
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
          />

          {/* 하단 메뉴(좌측) */}
          <CabinetFooterMenuButton />
        </div>

        <>
          {selectedBuilding === null && (
            <div className="absolute inset-y-0 left-40 right-80 items-center flex justify-center text-md">
              나중에 사용법 들어가면 좋을 것 같아서 추후에 추가하겠습니다
            </div>
          )}
        </>

        {/* 사물함 위치(중앙) */}
        <div className="absolute inset-y-0 left-0 right-0 md:left-64 md:right-80 border-gray-400 pt-16 hidden md:flex">
          {/* 건물 선택 후, 층수 선택을 둘 다 해야 사물함 컴포넌트가 보임 */}
          {selectedBuilding !== null && selectedFloor !== null && (
            <>
              <CabinetButtonLayout
                selectedBuilding={
                  buildingList.find(
                    (data) => data.building === selectedBuilding,
                  )?.building || null
                }
                selectedFloor={selectedFloor}
                isMyCabinet={isMyCabinet as boolean}
                filteredCabinetDetail={filteredCabinetDetail}
                fetchCabinetDetailInformation={fetchCabinetDetailInformation}
                selectedCabinet={selectedCabinet}
                selectedStatus={selectedStatus}
                setCabinetDataByFloor={setCabinetDataByFloor}
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
            selectedStatus={selectedStatus as string}
            setSelectedStatus={setSelectedStatus}
            setExpiredAt={setExpiredAt}
            setSelectedCabinet={setSelectedCabinet}
            expiredAt={expiredAt}
            isMyCabinet={isMyCabinet as boolean}
            setIsMyCabinet={setIsMyCabinet}
            setUsername={setUsername}
            isRentAvailable={isRentAvailable as boolean}
            setIsRentAvailable={setIsRentAvailable}
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
                      (data) => data.building === selectedBuilding,
                    )?.building || null
                  }
                  selectedFloor={selectedFloor}
                  isMyCabinet={isMyCabinet as boolean}
                  filteredCabinetDetail={filteredCabinetDetail}
                  fetchCabinetDetailInformation={fetchCabinetDetailInformation}
                  selectedCabinet={selectedCabinet}
                  selectedStatus={selectedStatus}
                  setCabinetDataByFloor={setCabinetDataByFloor}
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
              selectedStatus={selectedStatus as string}
              setSelectedStatus={setSelectedStatus}
              setExpiredAt={setExpiredAt}
              setSelectedCabinet={setSelectedCabinet}
              expiredAt={expiredAt}
              isMyCabinet={isMyCabinet as boolean}
              setIsMyCabinet={setIsMyCabinet}
              setUsername={setUsername}
              isRentAvailable={isRentAvailable as boolean}
              setIsRentAvailable={setIsRentAvailable}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
