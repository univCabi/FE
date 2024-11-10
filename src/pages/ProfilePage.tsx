import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearchInput } from "@/hooks/useSearchInput";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useUserData } from "@/hooks/useUserData";
import ProfileCard from "@/components/Profile/ProfileCard";
import RentalinfoCard from "@/components/Profile/RentalinfoCard";
import ProfileSaveButton from "@/components/Profile/ProfileSaveButton";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
const ProfilePage = () => {
  const { userData, userIsVisible, setUserIsVisible } = useUserData();
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
  const { searchInput, setSearchInput } = useSearchInput();

  return (
    <div>
      <SideNavigationLayout
        buildings={buildings}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        setSelectedFloor={setSelectedFloor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {/* 건물 정보(좌측) */}
      <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex-col pt-20 hidden md:flex">
        {/* 하단 메뉴(좌측) */}
        <CabinetFooterMenuButton />
      </div>

      {/* 메인 콘텐츠 (프로필 및 대여정보) */}
      <div className=" w-screen min-h-screen flex flex-col justify-center items-center">
        {/* md기준으로 flex-col과 flex-row 배치 */}
        <div className="mt-28 flex flex-col md:flex-row gap-10">
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
          <RentalinfoCard userRentalData={userData.RentCabinetInfo} />
        </div>
        <ProfileSaveButton userIsVisible={userIsVisible} />
      </div>
    </div>
  );
};

export default ProfilePage;
