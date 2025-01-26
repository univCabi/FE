import { useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";
import { userHistoryDataApi } from "@/api/userHistoryDataApi";
interface HistoryData {
  building: string;
  floor: number;
  section: string;
  cabinetNumber: number;
  startDate: string | null;
  endDate: string | null;
}

export const useHistoryData = () => {
  const [userHistoryData, setUserHistoryData] = useState<HistoryData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);
  const [lastElement, setLastElement] = useState<HTMLTableRowElement | null>(
    null
  );
  const pageSize: number = 10;
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await userHistoryDataApi(page, pageSize);
        if (response.data.results.length === 0) {
          setHasMoreResults(false);
        } else {
          setUserHistoryData((prev) => [...prev, ...response.data.results]);
        }
      } catch (error) {
        console.log(error.response?.status || "오류를 알 수 없습니다.");
      }
    };
    if (hasMoreResults) fetchHistoryData();
  }, [page]);

  useEffect(() => {
    if (!lastElement) return;
    const observer = new IntersectionObserver(
      throttle((entries) => {
        if (entries[0].isIntersecting && hasMoreResults) {
          setPage((prev) => prev + 1);
        }
      }, 800), // 스크롤 내린지 0.8초 뒤에 api 호출되도록 설정
      { threshold: 0.8 }
    );
    observer.observe(lastElement);
    return () => observer.disconnect();
  }, [lastElement, hasMoreResults]);

  const setObserverRef = useCallback((node: HTMLTableRowElement) => {
    setLastElement(node); // 해당 <tr> 요소를 관찰 대상으로 지정정
  }, []);

  return { userHistoryData, setObserverRef };
};
