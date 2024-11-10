import { useProfileSave } from "@/hooks/useProfileSave";
const ProfileSaveButton = ({ userIsVisible }: { userIsVisible: boolean }) => {
  const { handleProfileSave } = useProfileSave(userIsVisible);
  return (
    <button
      onClick={handleProfileSave}
      className="mt-10 mb-10 w-40 h-16 bg-blue-600 rounded-lg justify-center items-center inline-flex text-center text-white hover:text-blue-950 text-xl shadow-2xl"
    >
      저장
    </button>
  );
};

export default ProfileSaveButton;
