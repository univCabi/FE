import axios from "axios";
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL; // VITE_LOGIN_URL 사용

interface loginApiProps {
  studentNumber: string;
  password: string;
}
export const loginApi = async ({ studentNumber, password }: loginApiProps) => {
  try {
    const response = await axios.post(`${LOGIN_URL}/authn/login`, {
      studentNumber,
      password,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, error: error.response.data };
  }
};
