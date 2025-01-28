import { userProfileInfoUpdateApi } from "@/api/userProfileInfoUpdateApi";
import { log } from "@/utils/logger";

export const useProfileSave = (userIsVisible: boolean, saveState: boolean) => {
  const handleProfileSave = async () => {
    if (userIsVisible === saveState) {
      // console.log("변경사항이없음");
      log.info("변경 사항 없음");
    } else {
      try {
        const response = await userProfileInfoUpdateApi(userIsVisible);
        // console.log(userIsVisible);
        // console.log(response.status);
        log.info("API 호출 성공: userProfileInfoUpdateApi");
      } catch (error) {
        // console.error(error);
        // console.log(error.response?.status || "오류를 알 수 없습니다.");
        log.error("API 호출 중 에러 발생: userProfileInfoUpdateApi");
      }
    }
  };
  return { handleProfileSave };
};
