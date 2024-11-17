import axios from "axios";
const LOGOUT_URL = import.meta.env.VITE_BE_URL; // VITE_LOGIN_URL 사용

export const logoutApi = async () => {
  try {
    const response = await axios.post(
      `${LOGOUT_URL}/authn/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
};
