import axios from "axios";
const DATA_URL = import.meta.env.VITE_LOGIN_URL; // VITE_LOGIN_URL 사용

export const userDataSaveButton = async (userIsVisible: boolean) => {
  try {
    const response = await axios.post(
      `${DATA_URL}/user/profile/me`,
      { isVisible: userIsVisible },
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
