import { useNavigate } from "react-router-dom";
import { log } from "@/utils/logger";
import { logoutApi } from "@/api/logoutApi";

export const useLogout = () => {
  const navigate = useNavigate();
  const loginUrl = import.meta.env.VITE_LOGIN_URL;
  const handleLogout = async () => {
    try {
      const response = await logoutApi();
      navigate(loginUrl);
      // console.log(response.status);
      log.info("API 호출 성공: logoutApi");
    } catch (error) {
      // console.error("로그아웃 중 오류가 발생했습니다:", error);
      // console.log(error.response?.status || "오류를 알 수 없습니다.");
      log.error("API 호출 중 에러 발생: logoutApi");
    }
  };
  return { handleLogout };
};
