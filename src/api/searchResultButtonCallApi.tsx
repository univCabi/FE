import axios from "axios";

export const searchResultButtonCallApi = async (
  building: string,
  floor: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/cabinet?building=${building}&floor=${floor}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
