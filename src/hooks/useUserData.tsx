import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "@/types/UserType";
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
  const [loading, setLoding] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoding(true);
        const response = await userDataApi();
        const data = response.data;
        setUserData({
          ...data,
          rentCabinetInfo:
            data.rentCabinetInfo || defaultUserData.rentCabinetInfo,
        });
        setUserIsVisible(data.isVisible);
        log.info(
          `API 호출 성공: userDataApi, ${JSON.stringify(response, null, 2)}`,
        );
      } catch (error) {
        log.error(`API 호출 중 에러 발생: userDataApi ${error}`);
      } finally {
        setLoding(false);
      }
    };
    getData();
  }, [navigate]);
  return { userData, userIsVisible, setUserIsVisible, loading };
};
