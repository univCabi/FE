import { userDataApi } from "@/api/userDataApi";
import { useState, useEffect } from "react";
interface UserData {
  name: string | null;
  isVisible: boolean;
  affiliation: string | null;
  studentNumber: number | null;
  phoneNumber: string | null;
  RentCabinetInfo: {
    building: string | null;
    floor: number | null;
    cabinetNumber: number | null;
    status: string | null;
    startDate: string | null;
    endDate: string | null;
    leftDate: number | null;
  };
}

const defaultUserData: UserData = {
  name: null,
  isVisible: false,
  affiliation: null,
  studentNumber: null,
  phoneNumber: null,
  RentCabinetInfo: {
    building: null,
    floor: null,
    cabinetNumber: null,
    status: null,
    startDate: null,
    endDate: null,
    leftDate: null,
  },
};

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [userIsVisible, setUserIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await userDataApi();
        const data = response.data;
        setUserData(data);
        setUserIsVisible(data.isVisible);
        console.log(response.status);
      } catch (error) {
        console.error("로그인 중 오류가 발생했습니다:", error);
        console.log(error.response?.status || "오류를 알 수 없습니다.");
      }
    };
    getData();
  }, []);
  return { userData, userIsVisible, setUserIsVisible };
};
