import { useState, useEffect } from "react";
import axios from "axios";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL; // VITE_LOGIN_URL 사용

const LoginPage = () => {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFalse, setLoginFalse] = useState<boolean>(false);
  const [loginAttempted, setLoginAttempted] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  // localStorage 토큰을 확인하고 로그인 상태 유지
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setUser(savedUser);
    }
  }, []);

  // 로그인 요청
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginAttempted(true);

    const loginData = {
      studentNumber: studentNumber,
      password: password,
    };

    try {
      const response = await axios.post(`${LOGIN_URL}/authn/login`, loginData);

      console.log("응답 데이터:", response.data);
      if (response.status === 200) {
        // 상태 코드 200로 로그인 성공 확인
        const { token, studentNumber } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", studentNumber);
        setUser(studentNumber);
        setLoginFalse(false);
      } else {
        setLoginFalse(true);
      }
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다:", error);
      setLoginFalse(true);
    }

    setStudentNumber("");
    setPassword("");
  };

  // 로그아웃 요청
  const onLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${LOGIN_URL}/authn/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLoginAttempted(false);
        setLoginFalse(false);
        setUser(null);
        setStudentNumber("");
        setPassword("");
      }
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      {user ? (
        <div className="w-[60%] max-w-[22rem] flex flex-col items-center p-10 bg-white rounded-lg shadow-lg">
          <p className="text-blue-600 mb-20 font-bold text-2xl">
            안녕하세요, {user}님
          </p>
          <button
            onClick={onLogout}
            className="w-[70%] text-white py-4 bg-blue-600 rounded-md"
          >
            로그아웃
          </button>
        </div>
      ) : (
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
          {loginAttempted && loginFalse && (
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
      )}
    </div>
  );
};

export default LoginPage;
