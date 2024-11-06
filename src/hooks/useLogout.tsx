import { useNavigate } from "react-router-dom";
import { logoutApi } from "@/api/logoutApi";

export const useLogout = () => {
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutApi();
      nav("/login");
      console.log(response.status);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
      console.log(error.response?.status || "오류를 알 수 없습니다.");
    }
  };
  return { handleLogout };
};
