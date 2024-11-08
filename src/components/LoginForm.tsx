import { useLogin } from "@/hooks/useLogin";
interface LoginFormProps {
  studentNumber: string;
  password: string;
  setStudentNumber: (value: string) => void;
  setPassword: (value: string) => void;
  loginSuccess: boolean;
  loginLogo: string;
  setLoginSuccess: (value: boolean) => void;
  handleLogin: () => Promise<void>;
}

const LoginForm = ({
  studentNumber,
  password,
  setStudentNumber,
  setPassword,
  loginSuccess,
  loginLogo,
  handleLogin,
}: LoginFormProps) => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
    setPassword("");
    setStudentNumber("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-[60%] max-w-[22rem] flex flex-col items-center p-10 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-4xl font-bold mb-5">Login</h2>
      <p className="text-blue-600 mb-5">여러분의 일상을 가볍게</p>
      <img className="w-[60%] mb-5" src={loginLogo} />
      <label className="text-xl mb-2">학번</label>
      <input
        className="w-[90%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-2"
        type="text"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
        placeholder="학번을 입력하세요."
      />
      <label className="text-xl mb-2">비밀번호</label>
      <input
        className="w-[90%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-4"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요."
      />
      {!loginSuccess && (
        <div className="mb-4 text-red-600">
          {"학번이나 비밀번호가 잘못되었습니다."}
        </div>
      )}
      <button
        type="submit"
        className="w-[70%] text-white py-4 bg-blue-600 rounded-md"
      >
        L o g i n
      </button>
    </form>
  );
};

export default LoginForm;
