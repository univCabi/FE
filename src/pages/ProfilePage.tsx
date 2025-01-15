import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearch } from "@/hooks/useSearch";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useUserData } from "@/hooks/useUserData";
import { useConfirmModalState } from "@/hooks/useConfirmModalState";
import ProfileInfoCard from "@/components/Profile/ProfileInfoCard";
import RentalInfoCard from "@/components/Profile/RentalInfoCard";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import ConfirmModalView from "@/components/ConfirmModalView";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import { useCabinetState } from "@/hooks/useCabinetState";
import { useProfileSave } from "@/hooks/useProfileSave";

const ProfilePage = () => {
  const { userData, userIsVisible, setUserIsVisible } = useUserData();
  const { handleProfileSave } = useProfileSave(
    userIsVisible,
    userData.isVisible
  );
  const { buildings } = useBuildingList();
  const {
    selectedBuilding,
    setSelectedBuilding,
    setSelectedFloor,
    isOpen,
    setIsOpen,
  } = useBuildingState();
  const { setSelectedCabinet } = useCabinetState();
  const { searchInput, setSearchInput } = useSearch();
  const { openProfileSaveButtonModal, setOpenProfileSaveButtonModal } =
    useConfirmModalState();

  const toggleSwitch = (): void => {
    setUserIsVisible(!userIsVisible);
  };

  const onSubmit = () => {
    handleProfileSave();
    window.location.reload();
    setOpenProfileSaveButtonModal(false);
  };

  return (
    <div className="relative h-screen flex flex-col">
      {/* 모달 */}
      {openProfileSaveButtonModal && (
        <ConfirmModalView
          onClick={onSubmit}
          title={"알림"}
          text={"해당 내용을 저장하시겠습니까?"}
          setModalCancelState={setOpenProfileSaveButtonModal}
        />
      )}
      {/* 상단 네비게이션 바 */}
      <header className="sticky top-0 left-0 right-0 h-16 z-10">
        <SideNavigationLayout
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
          setSelectedFloor={setSelectedFloor}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSelectedCabinet={setSelectedCabinet}
        />
      </header>

      {/* 메인 레이아웃 */}
      <div className="flex flex-grow pt-24">
        {/* 좌측 사이드바 */}
        <aside className="hidden md:flex fixed left-0 top-16 w-40 h-[calc(100%-4rem)] border-r-2 border-gray-400 flex-col bg-white">
          <CabinetFooterMenuButton />
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="ml-0 md:ml-40 flex-grow flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row gap-20 ">
            {/* 프로필 */}
            <ProfileInfoCard
              toggleSwitch={toggleSwitch}
              name={userData.name}
              userIsVisible={userIsVisible}
              affiliation={userData.affiliation}
              studentNumber={userData.studentNumber}
              phoneNumber={userData.phoneNumber}
            />
            {/* 대여정보 */}
            <RentalInfoCard userRentalData={userData.rentCabinetInfo} />
          </div>
          <SubmitAndNavigateButton
            className={`mt-10 mb-10 w-40 h-16 ${
              userIsVisible === userData.isVisible
                ? "bg-gray-400 "
                : "bg-blue-600 hover:text-blue-900"
            } rounded-lg justify-center items-center inline-flex text-center text-white text-xl shadow-2xl`}
            onClick={() => setOpenProfileSaveButtonModal(true)}
            text={"저장"}
            disabled={userIsVisible === userData.isVisible}
          />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
