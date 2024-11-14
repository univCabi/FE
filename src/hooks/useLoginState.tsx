import { useState } from "react";

export const useLoginState = () => {
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
