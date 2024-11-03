import { useState } from "react";

// 로그인을 위한 커스텀 훅
export const useLogin = () => {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);

  return {
    studentNumber,
    setStudentNumber,
    password,
    setPassword,
    loginSuccess,
    setLoginSuccess,
  };
};
