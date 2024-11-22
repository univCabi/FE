import { userProfileInfoUpdateApi } from "@/api/userProfileInfoUpdateApi";
export const useProfileSave = (userIsVisible: boolean, saveState: boolean) => {
  const handleProfileSave = async () => {
    if (userIsVisible === saveState) {
      console.log("변경사항이없음");
    } else {
      try {
        const response = await userProfileInfoUpdateApi(userIsVisible);
        console.log(userIsVisible);
        console.log(response.status);
      } catch (error) {
        console.error(error);
        console.log(error.response?.status || "오류를 알 수 없습니다.");
      }
    }
  };
  return { handleProfileSave };
};
