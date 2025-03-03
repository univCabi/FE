import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useHandleLogin } from "@/hooks/useHandleLogin";
import LogoSVG from "@/icons/cabiLogo.svg?react";

const AdminLoginPage = () => {
  const {
    handleLogin,
    studentNumber,
    setStudentNumber,
    password,
    setPassword,
    loginSuccess,
    loading,
  } = useHandleLogin();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
    setPassword("");
    setStudentNumber("");
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      <>
        {loading && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <LogoSVG className="w-[80%] h-[15%] sl:w-[60%] animate-spin  mb-5" />
          </div>
        )}
        <form className="sl:w-[60%] w-[70%] sl:max-w-[22.5rem]  flex flex-col items-center p-12 sl:p-10 bg-white rounded-lg shadow-lg">
          <h2 className="text-[2.25em] font-bold mb-5">Login</h2>
          <p className="text-blue-600 mb-5 text-[0.75rem] sm:text-base">
            여러분의 일상을 가볍게
          </p>
          <LogoSVG className="w-[80%] h-[50%] sl:w-[60%]  mb-5" />
          <label className="sm:text-xl mb-2">관리자 아이디</label>
          <input
            className="text-sm sm:text-base w-[120%] sl:w-[90%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-2"
            type="text"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            placeholder="아이디를 입력하세요."
          />
          <label className="sm:text-xl mb-2">비밀번호</label>
          <input
            className="text-sm sm:text-base w-[120%] sl:w-[90%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요."
          />
          {!loginSuccess && (
            <div className="text-sm sm:text-base mb-4 text-red-600">
              {"아이디 또는 비밀번호가 잘못되었습니다."}
            </div>
          )}

          <SubmitAndNavigateButton
            text={"L  o  g  i  n"}
            className={
              "button-submit whitespace-pre text-sm sm:text-base w-[60%] sl:w-[70%]  text-white py-2.5 sl:py-3.5"
            }
            onClick={(e) => onSubmit(e as React.FormEvent)}
          />
        </form>
      </>
    </div>
  );
};

export default AdminLoginPage;
