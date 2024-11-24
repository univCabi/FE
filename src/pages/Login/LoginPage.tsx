import { useLogin } from "@/hooks/useLogin";
import LoginForm from "@/components/Login/LoginForm";
import loginLogo from "@/images/android-icon.png";
// 페이지 <-> 컴포넌트 <-> 훅 <-> api
const LoginPage = () => {
  const {
    handleLogin,
    studentNumber,
    setStudentNumber,
    password,
    setPassword,
    loginSuccess,
    setLoginSuccess,
  } = useLogin();

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      <LoginForm
        studentNumber={studentNumber}
        setStudentNumber={setStudentNumber}
        password={password}
        setPassword={setPassword}
        loginSuccess={loginSuccess}
        loginLogo={loginLogo}
        setLoginSuccess={setLoginSuccess}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
