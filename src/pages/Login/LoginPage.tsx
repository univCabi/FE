import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  const { login } = useLogin();
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);

  // 커스텀 훅을 사용한 로그인 로직
  const handleLogin = async (studentNumber: string, password: string) => {
    const success = await login({ studentNumber, password });
    setLoginSuccess(success);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      <LoginForm onSubmit={handleLogin} loginSuccess={loginSuccess} />
    </div>
  );
};

export default LoginPage;
