import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import ConfirmModalView from "@/components/ConfirmModalView";
import ProfileInfoCard from "@/components/Profile/ProfileInfoCard";
import RentalInfoCard from "@/components/Profile/RentalInfoCard";
import ProfileSkeleton from "@/components/Skeleton/ProfileSkeleton";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useConfirmModalState } from "@/hooks/useConfirmModalState";
import { useProfileSave } from "@/hooks/useProfileSave";
import { useUserData } from "@/hooks/useUserData";

const ProfilePage = () => {
  const { userData, userIsVisible, setUserIsVisible, loading } = useUserData();

  const { handleProfileSave } = useProfileSave(
    userIsVisible,
    userData.isVisible,
  );

  const { openProfileSaveButtonModal, setOpenProfileSaveButtonModal } =
    useConfirmModalState();

  const toggleSwitch = (): void => {
    setUserIsVisible(!userIsVisible);
  };

  const onSubmit = async () => {
    await handleProfileSave();
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
      {/* 메인 레이아웃 */}
      <div className="flex flex-grow pt-24">
        {/* 좌측 사이드바 */}
        <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex-col pt-20 hidden md:flex">
          {/* 하단 메뉴(좌측) */}
          <CabinetFooterMenuButton />
        </div>

        {/* 메인 콘텐츠 */}
        <main className="ml-0 md:ml-40 flex-grow flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row gap-20 ">
            {/* 프로필 */}
            {loading ? (
              <ProfileSkeleton />
            ) : (
              <ProfileInfoCard
                toggleSwitch={toggleSwitch}
                name={userData.name}
                userIsVisible={userIsVisible}
                affiliation={userData.affiliation}
                studentNumber={userData.studentNumber}
                phoneNumber={userData.phoneNumber}
              />
            )}

            {loading ? (
              <ProfileSkeleton />
            ) : (
              <RentalInfoCard rentCabinetInfo={userData.rentCabinetInfo} />
            )}
          </div>
          <SubmitAndNavigateButton
            className={`mt-10 mb-10 w-44 h-16 ${
              userIsVisible === userData.isVisible
                ? "bg-gray-400 "
                : "hover:text-blue-900"
            } btn-submit justify-center items-center inline-flex text-center text-xl`}
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
