import LoginForm from "@/components/Login/LoginForm";

const AdminLoginPage = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      <LoginForm idInputLabel="관리자 아이디" />
    </div>
  );
};

export default AdminLoginPage;
