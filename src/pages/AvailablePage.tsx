import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { CabinetStatus } from "@/types/StatusEnum";
import { getRemainingTime } from "@/utils/formatDate";
import { SideNavigationLayoutContext } from "@/contexts/SideNavigationLayoutContext";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useAvailableCabinet } from "@/hooks/useAvailableCabinet";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinet } from "@/hooks/useCabinet";
import { useCabinetActivation } from "@/hooks/useCabinetActivation";
import { useUserData } from "@/hooks/useUserData";
import LockSVG from "@/icons/lock.svg?react";
import ReloadSVG from "@/icons/reload.svg?react";
import affiliationBuildingData from "@/mocks/affiliatioinBuildingData.json";

const AvailablePage = () => {
  const { selectedBuilding, setSelectedBuilding } = useContext(
    SideNavigationLayoutContext,
  );
  const location = useLocation();
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

  const { getStatusColor } = useCabinet();
  const rowsPerCol = 4; // 총 몇 줄의 사물함을 배치할 것인지 설정
  const {
    availableFloors,
    setAvailableFloors,
    cabinetDataByFloor,
    setCabinetDataByFloor,
    setLeftTime,
    setSaveAffiliation,
  } = useAvailableCabinet();

  const { fetchAvailableCabinetData, cabinetData } = useCabinetActivation({
    selectedBuilding,
    selectedFloor,
    isMyCabinet,
    setCabinetDataByFloor,
  });
  const { userData } = useUserData();

  const reloadAvailableCabinet = () => {
    window.location.reload();
  };

  // 실시간 시간 바뀜
  useEffect(() => {
    setLeftTime(getRemainingTime()); // 초기값 설정
    const timer = setInterval(() => {
      setLeftTime(getRemainingTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/available")) {
      if (selectedBuilding !== null && availableFloors !== null) {
        fetchAvailableCabinetData(selectedBuilding, availableFloors);
      }
    }
  }, [selectedBuilding, availableFloors]);

  useEffect(() => {
    setSaveAffiliation(userData.affiliation);
    // 학과에 해당하는 건물 및 층 정보 찾기
    const affiliationData = affiliationBuildingData.find(
      (item) => item.affiliation === userData.affiliation,
    );
    if (affiliationData) {
      setSelectedBuilding(affiliationData.building);
      setAvailableFloors(affiliationData.floors);
    }
  }, [userData.affiliation]);

  return (
    <>
      <div className="relative h-screen flex flex-col">
        {/* 좌측 사이드바 */}
        <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex-col pt-20">
          {/* 하단 메뉴(좌측) */}
          <CabinetFooterMenuButton />
        </div>
        {/* 메인 콘텐츠 */}
        {/* <div className="absolute inset-y-0 left-0 right-0 md:left-40 md:right-80 border-gray-400 pt-16 hidden md:flex flex-col "> */}
        <div className="absolute inset-y-0 left-40 right-80 border-gray-400 pt-16 flex-col ">
          <>
            <div className="mt-14 flex flex-col items-center ">
              <div className="text-black text-4xl font-bold">
                사용 가능 사물함
              </div>
              <div className="text-black text-xl mt-4 flex flex-row items-center justify-center">
                <b>매일 오후 1시&nbsp;</b>
                <p>사용 가능한 사물함이 업데이트 예정입니다.</p>
              </div>
              <SubmitAndNavigateButton
                onClick={reloadAvailableCabinet}
                className={`button-cabinet-action w-60 h-10 mt-4 flex items-center justify-center`}
                text={`${getRemainingTime()}`}
                svgComponent={<ReloadSVG className="w-5 mr-2" />}
              />
            </div>
          </>
          <>
            {availableFloors?.map((floors) => {
              const floorData = cabinetDataByFloor[floors] || [];
              const filteredCabinetData = floorData.filter(
                (cabinet) => cabinet.status === CabinetStatus.AVAILABLE,
              );
              return (
                <div key={floors} className="mt-16">
                  <div className="text-2xl text-left text-gray-600 font-bold mx-24">
                    {selectedBuilding} {floors}F
                  </div>
                  <div className="mt-3 border border-b-1 border-x-0 border-t-0 border-gray-400 mx-24" />
                  <div className="relative w-full flex items-center justify-center overflow-scroll">
                    <div className="relative w-full max-w-[80%] h-[30rem] flex flex-wrap items-center justify-center mt-3">
                      {filteredCabinetData.map((cabinet, index) => {
                        const row = Math.floor(index / rowsPerCol);
                        const col = index % rowsPerCol;
                        const isSelected =
                          selectedCabinet?.cabinetId === cabinet.id;
                        return (
                          <button
                            key={cabinet.id}
                            className={`absolute w-16 h-20 rounded-md hover:bg-opacity-80 flex items-end text-sm p-2 mt-12
                                  ${getStatusColor(cabinet.status, cabinet.isMine)} 
                                  ${isSelected ? "shadow-md" : ""}
                                `}
                            style={{
                              top: `${col * 100}px`,
                              left: `${row * 90}px`,
                              transform: "translate(-50%, -50%)", // 중앙 정렬
                            }}
                            onClick={() => {
                              setSelectedFloor(floors);
                              fetchCabinetDetailInformation(
                                cabinet.id,
                                cabinet.cabinetNumber,
                              );
                            }}
                          >
                            {cabinet.cabinetNumber}
                            {cabinet.status === CabinetStatus.AVAILABLE &&
                              !cabinet.isRentAvailable && (
                                <div className="absolute top-6 right-4">
                                  <LockSVG className="h-7 items-center justify-center" />
                                </div>
                              )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        </div>
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
          isRentAvailable={isRentAvailable}
          setIsRentAvailable={setIsRentAvailable}
        />
      </div>
    </>
  );
};

export default AvailablePage;

// const reloadAvailableCabinet = async () => {
//   if (!selectedBuilding || !selectedFloor) return;

//   try {
//     // 최신 사물함 데이터 가져오기
//     const updatedData = await fetchCabinetData(
//       selectedBuilding,
//       selectedFloor,
//     );

//     // targetTime === 0인 사물함의 isRentAvailable을 true로 변경
//     const modifiedData = updatedData.map((cabinet) =>
//       targetTime
//         ? { ...cabinet, isRentAvailable: true }
//         : cabinet,
//     );

//     // 변경된 데이터 상태 반영
//     setCabinetData(modifiedData);
//     console.log("업데이트된 사물함 데이터:", modifiedData);
//     // window.location.reload();
//   } catch (error) {
//     console.error("사물함 데이터 업데이트 중 에러 발생:", error);
//   }
// };
