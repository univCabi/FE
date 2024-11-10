import { userDataSaveButton } from "@/api/userDataSaveButtton";

export const useProfileSaveButton = (userIsVisible: boolean) => {
  const handleProfileSave = async () => {
    try {
      const response = await userDataSaveButton(userIsVisible);
      console.log(userIsVisible);
      console.log(response.status);
      window.location.reload();
    } catch (error) {
      console.error(error);
      console.log(error.response?.status || "오류를 알 수 없습니다.");
    }
  };
  return { handleProfileSave };
};
