import { userHistoryDataApi } from "@/api/userHistoryDataApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
interface HistoryData {
  building: string;
  floor: number;
  section: string;
  cabinetNumber: number;
  startDate: string;
  endDate: string;
}

export const useHistoryData = () => {
  const [userHistoryData, setUserHistoryData] = useState<HistoryData[]>([]);
  const navigate = useNavigate();
  const loginUrl = import.meta.env.VITE_LOGIN_URL;
  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const response = await userHistoryDataApi();
        setUserHistoryData(response.data);
        console.log(response.status);
      } catch (error) {
        if (error.response.status === 401) {
          navigate(loginUrl);
        }
        console.error("로그인 중 오류가 발생했습니다:", error);
        console.log(error.response?.status || "오류를 알 수 없습니다.");
      }
    };
    getHistoryData();
  }, []);
  return { userHistoryData };
};
