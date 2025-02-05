import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/loginApi";
import { log } from "@/utils/logger";

export const useHandleLogin = () => {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginApi({ studentNumber, password });
      navigate("/main");
      setLoginSuccess(true); // 로그인 성공
      log.info(`API 호출 성공: loginApi, ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      log.error("API 호출 중 에러 발생: loginApi");
      setLoginSuccess(false); // 로그인 실패
    } finally {
      setLoading(false);
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
    loading,
  };
};
