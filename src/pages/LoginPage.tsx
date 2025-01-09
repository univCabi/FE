import LoginForm from "@/components/Login/LoginForm";
// 페이지 <-> 컴포넌트 <-> 훅 <-> api
const LoginPage = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
