import { loginApi } from "@/api/loginApi";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "@/hooks/useLoginState";

export const useLogin = () => {
  const navigate = useNavigate();
  const {
    studentNumber,
    setStudentNumber,
    password,
    setPassword,
    loginSuccess,
    setLoginSuccess,
  } = useLoginState();

  const handleLogin = async () => {
    try {
      const response = await loginApi({
        studentNumber,
        password,
      });
      navigate("/main");
      setLoginSuccess(true); //로그인 성공
      console.log(response.status); // 로그인 상태 코드 로그
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다:", error);
      console.log(error.response?.status || "오류를 알 수 없습니다.");
      setLoginSuccess(false); //로그인 실패
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
