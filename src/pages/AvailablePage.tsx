import { useContext, useEffect } from "react";
import { SideNavigationLayoutContext } from "@/contexts/SideNavigationLayoutContext";
import AvailableCabinetLayout from "@/components/Available/AvailableCabinetLayout";
import AvailableCountdown from "@/components/Available/AvailableCountdown";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import { useAvailableCabinet } from "@/hooks/useAvailableCabinet";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinet } from "@/hooks/useCabinet";
import { useUserData } from "@/hooks/useUserData";

const AvailablePage = () => {
  const { selectedBuilding, setSelectedBuilding } = useContext(
    SideNavigationLayoutContext,
  );
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
  const {
    availableFloors,
    setAvailableFloors,
    setSaveAffiliation,
    cabinetDataByFloor,
    setCabinetDataByFloor,
  } = useAvailableCabinet();
  const { userData } = useUserData();

  return (
    <>
      <div className="relative h-screen flex flex-col">
        {/* 좌측 사이드바 */}
        <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex-col pt-20 hidden sm:flex">
          {/* 하단 메뉴(좌측) */}
          <CabinetFooterMenuButton />
        </div>
        {/* 메인 콘텐츠 */}
        <div className="absolute inset-y-0 left-0 right-0 md:left-40 md:right-80 sm:left-[7rem] border-gray-400 pt-16 sm:flex flex-col overflow-y-auto">
          <AvailableCountdown />
          <AvailableCabinetLayout
            availableFloors={availableFloors}
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedCabinet={selectedCabinet}
            setSelectedFloor={setSelectedFloor}
            isMyCabinet={isMyCabinet as boolean}
            fetchCabinetDetailInformation={fetchCabinetDetailInformation}
            cabinetDataByFloor={cabinetDataByFloor}
            setCabinetDataByFloor={setCabinetDataByFloor}
            setSelectedBuilding={setSelectedBuilding}
            setAvailableFloors={setAvailableFloors}
            setSaveAffiliation={setSaveAffiliation}
            userData={userData}
          />
        </div>
      </div>

      {/* 화면 크기 = 768px 이상일 때 */}
      {/* 선택한 사물함 정보(우측) */}
      <div className="absolute inset-y-0 right-0 w-80 border-gray-400 border-l-2 pt-20 md:flex hidden">
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
        />
      </div>
      {/* 화면 크기 = 768px 이하일 때 */}
      {selectedCabinet && (
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
          />
        </div>
      )}
    </>
  );
};

export default AvailablePage;
