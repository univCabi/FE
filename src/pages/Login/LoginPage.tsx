import { useState } from "react";
import axios from "axios";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL; // VITE_LOGIN_URL 사용

const LoginPage = () => {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFalse, setLoginFalse] = useState<boolean>(false);
  const onSubmit = async (e: React.FormEvent) => {
    // async 와 React.FormEvent 조사
    e.preventDefault();

    const loginData = {
      studentNumber: studentNumber,
      password: password,
    };
    try {
      const response = await axios.post(`${LOGIN_URL}/login`, loginData);
      if (response.data.success) {
        setLoginFalse(false);
      } else {
        setLoginFalse(true);
      }
    } catch (error) {
      setLoginFalse(true);
    }
  };
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400 ">
      <form className="w-[60%] max-w-[22rem] flex flex-col items-center p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-5">Login</h2>
        <p className="text-blue-300 mb-20">여러분의 일상을 가볍게</p>
        <label className="text-xl mb-2">학번</label>
        <input
          className="w-[90%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-2"
          type="text"
          value={studentNumber}
          onChange={(e) => {
            setStudentNumber(e.target.value);
          }}
          placeholder="학번을 입력하세요."
        />
        <label className="text-xl mb-2">비밀번호</label>
        <input
          className="w-[90%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 입력하세요."
        />
        {loginFalse && (
          <div className="mb-4 text-red-600">
            {"학번이나 비밀번호가 잘못되었습니다."}
          </div>
        )}
        <button
          onClick={onSubmit}
          type="submit"
          className="w-[70%] text-white py-4 bg-blue-600 rounded-md"
        >
          L o g i n
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
