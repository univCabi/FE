import api from "@/api/axiosInterceptApi";
import { setAccessToken } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store/store";

interface LoginApiProps {
  studentNumber: string;
  password: string;
}

export const loginApi = async (
  dispatch: AppDispatch,
  { studentNumber, password }: LoginApiProps
) => {
  try {
    const response = await api.post("/authn/login", {
      studentNumber,
      password,
    });

    const accessToken = response.data.accessToken;

    // Redux 상태에 accessToken 저장
    dispatch(setAccessToken(accessToken));

    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("loginApi 오류:", error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
};
