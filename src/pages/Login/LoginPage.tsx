import { useLogin } from "@/hooks/useLogin";
import LoginForm from "@/components/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginLogo from "@/images/android-icon.png";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL; // VITE_LOGIN_URL 사용

const LoginPage = () => {
  const {
    studentNumber,
    setStudentNumber,
    password,
    setPassword,
    loginSuccess,
    setLoginSuccess,
  } = useLogin();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${LOGIN_URL}/authn/login`, {
        studentNumber,
        password,
      });
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("studentNumber", studentNumber);
        navigate("/main");
        setLoginSuccess(true); //로그인 성공
        console.log(response.status); // 로그인 상태 코드 로그
      } else {
        setLoginSuccess(false); //로그인 실패
        console.log(response.status); // 로그인 상태 코드 로그
      }
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다:", error);
      console.log(error.response?.status || "오류를 알 수 없습니다.");
      setLoginSuccess(false); //로그인 실패
    }
  };

  const onSubmit = async () => {
    await handleLogin();
    setPassword("");
    setStudentNumber("");
  };
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      <LoginForm
        onSubmit={onSubmit}
        studentNumber={studentNumber}
        setStudentNumber={setStudentNumber}
        password={password}
        setPassword={setPassword}
        loginSuccess={loginSuccess}
        loginLogo={loginLogo}
      />
    </div>
  );
};

export default LoginPage;
