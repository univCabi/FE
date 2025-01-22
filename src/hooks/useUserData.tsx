import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "@/interface";
import { userDataApi } from "@/api/userDataApi";

const defaultUserData: UserData = {
  name: null,
  isVisible: false,
  affiliation: null,
  studentNumber: null,
  phoneNumber: null,
  rentCabinetInfo: {
    building: null,
    floor: null,
    cabinetNumber: null,
    status: null,
    startDate: null,
    endDate: null,
  },
};

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [userIsVisible, setUserIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await userDataApi();
        const data = response.data;
        setUserData({
          ...data,
          rentCabinetInfo:
            data.rentCabinetInfo || defaultUserData.rentCabinetInfo,
        });
        console.log(data);
        setUserIsVisible(data.isVisible);
        console.log(response.status);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        console.error("로그인 중 오류가 발생했습니다:", error);
        console.log(error.response?.status || "오류를 알 수 없습니다.");
      }
    };
    getData();
  }, []);
  return { userData, userIsVisible, setUserIsVisible };
};
