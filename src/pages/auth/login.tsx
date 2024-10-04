import { useState } from "react";
import axios from "axios";
const LoginPage = () => {
  const [stn, setStn] = useState<string>(""); //studentnumber의 약자로 stn을 사용하였습니다.
  const [password, setPassword] = useState<string>("");
  const onSubmit = async (e: React.FormEvent) => {
    // async 와 React.FormEvent 조사
    e.preventDefault();

    const loginData = {
      studentNumber: stn,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://e96fd938-e382-4189-9796-d66e716c5e54.mock.pstmn.io",
        loginData
      );
      if (response.data.success) {
        alert("로그인 성공");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.log("에러 :", error);
      alert("뭔가 잘못됬으니까 다시만드세요");
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
          value={stn}
          onChange={(e) => {
            setStn(e.target.value);
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
