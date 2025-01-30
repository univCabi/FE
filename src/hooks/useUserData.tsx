import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "types/UserType";
import { log } from "@/utils/logger";
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
        setUserIsVisible(data.isVisible);
        log.info(
          `API 호출 성공: userDataApi, ${JSON.stringify(response, null, 2)}`
        );
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        log.error("API 호출 중 에러 발생: userDataApi");
        log.error("로그인 중 오류가 발생했습니다:");
        // console.log(error.response?.status || "오류를 알 수 없습니다.");
      }
    };
    getData();
  }, []);
  return { userData, userIsVisible, setUserIsVisible };
};
