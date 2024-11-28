import { useProfileSave } from "@/hooks/useProfileSave";
interface ProfileSaveButtonProp {
  userIsVisible: boolean;
  saveState: boolean;
}

const ProfileSaveButton = ({
  userIsVisible,
  saveState,
}: ProfileSaveButtonProp) => {
  const { handleProfileSave } = useProfileSave(userIsVisible, saveState);
  return (
    <button
      onClick={handleProfileSave}
      disabled={userIsVisible === saveState}
      className={`mt-10 mb-10 w-40 h-16 ${
        userIsVisible === saveState
          ? "bg-gray-400 "
          : "bg-blue-600 hover:text-blue-900"
      } rounded-lg justify-center items-center inline-flex text-center text-white text-xl shadow-2xl`}
    >
      저장
    </button>
  );
};

export default ProfileSaveButton;
