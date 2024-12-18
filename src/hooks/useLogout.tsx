import { useNavigate } from "react-router-dom";
import { logoutApi } from "@/api/logoutApi";

export const useLogout = () => {
  const navigate = useNavigate();
  const loginUrl = import.meta.env.VITE_LOGIN_URL;
  const handleLogout = async () => {
    try {
      const response = await logoutApi();
      navigate(loginUrl);
      console.log(response.status);
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
      console.log(error.response?.status || "오류를 알 수 없습니다.");
    }
  };
  return { handleLogout };
};
