import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearch } from "@/hooks/useSearch";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useUserData } from "@/hooks/useUserData";
import ProfileCard from "@/components/Profile/ProfileCard";
import RentalinfoCard from "@/components/Profile/RentalinfoCard";
import ProfileSaveButton from "@/components/Profile/ProfileSaveButton";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import { useCabinetState } from "@/hooks/useCabinetState";

const ProfilePage = () => {
  const { userData, userIsVisible, setUserIsVisible, saveState } =
    useUserData();
  const toggleSwitch = (): void => {
    setUserIsVisible(!userIsVisible);
  };
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

  return (
    <div className="relative h-screen flex flex-col">
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
            <ProfileCard
              toggleSwitch={toggleSwitch}
              name={userData.name}
              userIsVisible={userIsVisible}
              affiliation={userData.affiliation}
              studentNumber={userData.studentNumber}
              phoneNumber={userData.phoneNumber}
            />
            {/* 대여정보 */}
            <RentalinfoCard userRentalData={userData.rentCabinetInfo} />
          </div>
          <ProfileSaveButton
            userIsVisible={userIsVisible}
            saveState={saveState}
          />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
