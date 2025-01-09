import { useHandleLogin } from "@/hooks/useHandleLogin";
import LoginForm from "@/components/Login/LoginForm";
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
  } = useHandleLogin();

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      <LoginForm
        studentNumber={studentNumber}
        setStudentNumber={setStudentNumber}
        password={password}
        setPassword={setPassword}
        loginSuccess={loginSuccess}
        setLoginSuccess={setLoginSuccess}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
