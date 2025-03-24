import { useEffect, useState } from "react";
import { log } from "@/utils/logger";
import { barChartDataApi } from "@/api/barChartDataApi";

interface BarChartData {
  name: string;
  total: number;
  using: number;
  overdue: number;
  broken: number;
  available: number;
}

export const useBarChartData = () => {
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await barChartDataApi();
        setBarChartData(response.buildings);
        log.info(
          `API 호출 성공: barChartDataApi, ${JSON.stringify(response, null, 2)}`,
        );
      } catch (error) {
        log.error(`API 호출 중 에러 발생: barChartDataApi ${error}`);
      }
    };
    getData();
  }, []);

  return { barChartData };
};
