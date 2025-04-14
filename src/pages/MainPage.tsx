import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { SideNavigationLayoutContext } from "@/contexts/SideNavigationLayoutContext";
import BuildingSelectButton from "@/components/BuildingSelectButton";
import CabinetButtonLayout from "@/components/Cabinet/CabinetButtonLayout";
import CabinetStatusInformation from "@/components/Cabinet/CabinetStatusInformation";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import { useBookmark } from "@/hooks/useBookmark";
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
  const { isBookmark, bookmarkIds, setIsBookmark } = useBookmark({
    selectedCabinet,
  });

  useEffect(() => {
    if (location.state?.selectedBuilding) {
      setSelectedBuilding(location.state.selectedBuilding);
      setSelectedFloor(location.state.selectedFloor ?? null);
      setSelectedCabinet(null);
    }
  }, [location.state]);

  return (
    <>
      {/* 화면 크기 = 768px 이상일 때 */}
      <div className="md:flex">
        {/* 건물 정보(좌측) */}
        <div
          className={`absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 
            ${selectedFloor === null ? "flex z-10" : "hidden"} 
            md:flex`}
        >
          <BuildingSelectButton
            buildingList={buildingList}
            selectedBuilding={selectedBuilding}
            setSelectedBuilding={setSelectedBuilding}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
            setSelectedCabinet={setSelectedCabinet}
          />
          <CabinetFooterMenuButton />
        </div>

        <>
          {selectedBuilding === null && (
            <div className="absolute inset-y-0 left-40 right-80 items-center flex justify-center text-md">
              {/* TODO: 나중에 사용법 추가하기 */}
            </div>
          )}
        </>

        {/* 사물함 위치(중앙) */}
        <div className="absolute inset-y-0 left-0 right-0 md:left-64 md:right-80 border-gray-400 pt-16 md:flex">
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
                bookmarkIds={bookmarkIds}
              />
              <div className="hidden sl:flex">
                <CabinetStatusInformation />
              </div>
            </>
          )}
        </div>

        {/* 선택한 사물함 정보(우측) */}
        {selectedCabinet ? (
          <div className="absolute inset-y-0 right-0 border-gray-400 border-l-2 pt-20">
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
              isBookmark={isBookmark as boolean}
              setIsBookmark={setIsBookmark}
            />
          </div>
        ) : (
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
              isRentAvailable={isRentAvailable}
              setIsRentAvailable={setIsRentAvailable}
              isBookmark={isBookmark as boolean}
              setIsBookmark={setIsBookmark}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
