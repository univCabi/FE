import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { log } from "@/utils/logger";
import { loginApi } from "@/api/loginApi";

export const useHandleLogin = () => {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await loginApi({ studentNumber, password });
      navigate("/main");
      setLoginSuccess(true); // 로그인 성공
      // console.log(response.status); // 로그인 상태 코드 로그
      log.info("API 호출 성공: loginApi");
    } catch (error) {
      // console.error("로그인 중 오류가 발생했습니다:", error);
      // console.log(error.response?.status || "오류를 알 수 없습니다.");
      log.error("API 호출 중 에러 발생: loginApi");
      setLoginSuccess(false); // 로그인 실패
    }
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
