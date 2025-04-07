import { useNavigate } from "react-router-dom";
import { log } from "@/utils/logger";
import { logoutApi } from "@/api/logoutApi";

export const useLogout = () => {
  const navigate = useNavigate();
  const loginUrl = import.meta.env.VITE_LOGIN_URL;
  const handleLogout = async () => {
    try {
      const response = await logoutApi();
      const redirectPath = location.pathname.startsWith("/admin")
        ? "/admin/"
        : loginUrl;
      navigate(redirectPath);
      log.info(
        `API 호출 성공: logoutApi, ${JSON.stringify(response, null, 2)}`,
      );
    } catch (error) {
      log.error(`API 호출 중 에러 발생: logoutApi ${error}`);
    }
  };
  return { handleLogout };
};
