import axios from "axios";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL; // VITE_LOGIN_URL 사용

interface LoginData {
  studentNumber: string;
  password: string;
}
// 로그인을 위한 훅
export const useLogin = () => {
  const navigate = useNavigate();

  const login = async (loginData: LoginData) => {
    try {
      const response = await axios.post(`${LOGIN_URL}/authn/login`, loginData);
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("studentNumber", loginData.studentNumber);
        navigate("/main");
        return true; //로그인 성공
      }
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다:", error);
    }
    return false; //로그인 실패
  };
  return { login };
};
