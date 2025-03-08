import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { SideNavigationLayoutContext } from "@/contexts/SideNavigationLayoutContext";
import AdminInfoChart from "@/components/Admin/AdminInfoChart";
import AdminCabinetLayout from "@/components/Admin/Cabinet/AdminCabinetLayout";
import AdminSelectedCabinetInformation from "@/components/Admin/Cabinet/AdminSelectedCabinetInformation";
import BuildingSelectButton from "@/components/BuildingSelectButton";
import CabinetStatusInformation from "@/components/Cabinet/CabinetStatusInformation";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import { useAdminCabinet } from "@/hooks/useAdminCabinet";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinet } from "@/hooks/useCabinet";

const AdminMainPage = () => {
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
    username,
    setUsername,
  } = useCabinet();
  const {
    selectedMultiCabinets,
    setSelectedMultiCabinets,
    multiButtonActive,
    setMultiButtonActive,
  } = useAdminCabinet();

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

        {/* 사물함 위치(중앙) */}
        <div className="absolute inset-y-0 left-0 right-0 md:left-64 md:right-80 border-gray-400 pt-16 hidden md:flex">
          {selectedBuilding !== null && selectedFloor !== null && (
            <>
              <AdminCabinetLayout
                selectedBuilding={
                  buildingList.find(
                    (data) => data.building === selectedBuilding,
                  ) || null
                }
                selectedFloor={selectedFloor}
                isMyCabinet={isMyCabinet as boolean}
                filteredCabinetDetail={filteredCabinetDetail}
                fetchCabinetDetailInformation={fetchCabinetDetailInformation}
                selectedMultiCabinets={selectedMultiCabinets}
                setSelectedMultiCabinets={setSelectedMultiCabinets}
                multiButtonActive={multiButtonActive}
                setMultiButtonActive={setMultiButtonActive}
                setSelectedCabinet={setSelectedCabinet}
                selectedCabinet={selectedCabinet}
                // selectedStatus={selectedStatus}
              />
              <CabinetStatusInformation />
            </>
          )}
        </div>

        {/* 통계 */}
        <div className="absolute inset-y-0 left-0 right-0 md:left-64 border-gray-400 pt-16 hidden md:flex">
          {selectedBuilding === null && <AdminInfoChart />}
        </div>

        {/* 선택한 사물함 정보(우측) */}
        {selectedBuilding && (
          <div className="absolute inset-y-0 right-0 w-80 border-gray-400 border-l-2 pt-20 hidden md:flex">
            <AdminSelectedCabinetInformation
              selectedBuilding={selectedBuilding}
              selectedFloor={selectedFloor}
              selectedCabinet={selectedCabinet}
              selectedStatus={selectedStatus as string}
              setSelectedStatus={setSelectedStatus}
              setExpiredAt={setExpiredAt}
              setSelectedCabinet={setSelectedCabinet}
              expiredAt={expiredAt}
              // isMyCabinet={isMyCabinet as boolean}
              setIsMyCabinet={setIsMyCabinet}
              selectedMultiCabinets={selectedMultiCabinets}
              multiButtonActive={multiButtonActive}
              username={username}
            />
          </div>
        )}
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
                <AdminCabinetLayout
                  selectedBuilding={
                    buildingList.find(
                      (data) => data.building === selectedBuilding,
                    ) || null
                  }
                  selectedFloor={selectedFloor}
                  isMyCabinet={isMyCabinet as boolean}
                  filteredCabinetDetail={filteredCabinetDetail}
                  fetchCabinetDetailInformation={fetchCabinetDetailInformation}
                  selectedMultiCabinets={selectedMultiCabinets}
                  setSelectedMultiCabinets={setSelectedMultiCabinets}
                  multiButtonActive={multiButtonActive}
                  setMultiButtonActive={setMultiButtonActive}
                  setSelectedCabinet={setSelectedCabinet}
                  selectedCabinet={selectedCabinet}
                  // selectedStatus={selectedStatus}
                />
              </div>
              {/* 화면 크기 = 768px 이하일 때 사물함 정보 숨김 */}
              <div className="hidden sl:flex">
                <CabinetStatusInformation />
              </div>
            </>
          </div>
        )}

        <div className="absolute inset-y-0 left-64 border-gray-400 pt-16 flex">
          {selectedBuilding === null && <AdminInfoChart />}
        </div>

        {/* 사물함 선택 완료 -> cabinetRental 컴포넌트 표시 */}
        {selectedCabinet && (
          <div className="absolute inset-y-0 right-0 w-80 border-gray-400 border-l-2 pt-20 flex">
            <AdminSelectedCabinetInformation
              selectedBuilding={selectedBuilding}
              selectedFloor={selectedFloor}
              selectedCabinet={selectedCabinet}
              selectedStatus={selectedStatus as string}
              setSelectedStatus={setSelectedStatus}
              setExpiredAt={setExpiredAt}
              setSelectedCabinet={setSelectedCabinet}
              expiredAt={expiredAt}
              // isMyCabinet={isMyCabinet as boolean}
              setIsMyCabinet={setIsMyCabinet}
              selectedMultiCabinets={selectedMultiCabinets}
              multiButtonActive={multiButtonActive}
              username={username}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminMainPage;
