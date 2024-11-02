import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL; // VITE_LOGIN_URL 사용

interface LoginData {
  studentNumber: string;
  password: string;
}
// 로그인을 위한 커스텀 훅
export const useLogin = () => {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogin = async (loginData: LoginData) => {
    try {
      const response = await axios.post(`${LOGIN_URL}/authn/login`, loginData);
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("studentNumber", loginData.studentNumber);
        navigate("/main");
        setLoginSuccess(true); //로그인 성공
      }
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다:", error);
    }
    setLoginSuccess(false); //로그인 실패
  };
  return {
    handleLogin,
    studentNumber,
    setStudentNumber,
    password,
    setPassword,
    loginSuccess,
    setLoginSuccess,
  };
};
