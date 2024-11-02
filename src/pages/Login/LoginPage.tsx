import { useLogin } from "@/hooks/useLogin";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  const {
    handleLogin,
    studentNumber,
    setStudentNumber,
    password,
    setPassword,
    loginSuccess,
  } = useLogin();

  const onSubmit = async () => {
    await handleLogin({ studentNumber, password });
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
      />
    </div>
  );
};

export default LoginPage;
