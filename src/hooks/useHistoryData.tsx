import { userHistoryDataApi } from "@/api/userHistoryDataApi";
import { useEffect, useState } from "react";
interface HistoryData {
  building: string;
  floor: number;
  section: string;
  cabinetNumber: number;
  startDate: string | number | Date;
  endDate: string | number | Date;
}

export const useHistoryData = () => {
  const [userHistoryData, setUserHistoryData] = useState<HistoryData[]>([]);
  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const response = await userHistoryDataApi();
        setUserHistoryData(response.data.results);
        console.log(response.status);
      } catch (error) {
        console.error("로그인 중 오류가 발생했습니다:", error);
        console.log(error.response?.status || "오류를 알 수 없습니다.");
      }
    };
    getHistoryData();
  }, []);
  return { userHistoryData };
};
