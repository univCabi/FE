import api from "@/api/axiosInterceptApi";

interface LoginApiProps {
  studentNumber: string;
  password: string;
}

export const loginApi = async ({ studentNumber, password }: LoginApiProps) => {
  try {
    const response = await api.post("/authn/login", {
      studentNumber,
      password,
    });
    const accessToken = response.data.accessToken;
    document.cookie = `accessToken=${accessToken}; path=/; Secure; SameSite=Strict`;
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("loginApi 오류:", error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
};
