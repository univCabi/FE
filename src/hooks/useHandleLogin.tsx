import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { log } from "@/utils/logger";
import { loginApi } from "@/api/loginApi";

export const useHandleLogin = () => {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginApi({ studentNumber, password });

      // 현재 경로가 "/admin/login"이면 "/admin/main"으로 이동, 아니면 "/main"으로 이동
      const redirectPath = location.pathname.startsWith("/admin")
        ? "/admin/main"
        : "/main";

      navigate(redirectPath);
      setLoginSuccess(true); // 로그인 성공
      log.info(`API 호출 성공: loginApi, ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      log.error(`API 호출 중 에러 발생: loginApi ${error}`);
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
