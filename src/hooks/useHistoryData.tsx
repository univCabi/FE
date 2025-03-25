import { useCallback, useEffect, useState } from "react";
import { throttle } from "lodash";
import { HistoryData } from "@/types/ListType";
import { log } from "@/utils/logger";
import { userHistoryDataApi } from "@/api/userHistoryDataApi";

export const useHistoryData = () => {
  const [userHistoryData, setUserHistoryData] = useState<HistoryData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);
  const [lastElement, setLastElement] = useState<HTMLTableRowElement | null>(
    null,
  );
  const [scrollLoading, setScrollLoading] = useState<boolean>(false);
  const pageSize: number = 10;
  const scrollPendingTime: number = 800;
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await userHistoryDataApi(page, pageSize);
        if (response.data.results.length === 0) {
          setHasMoreResults(false);
        } else {
          setUserHistoryData((prev) => [...prev, ...response.data.results]);
        }
        log.info(
          `API 호출 성공: userHistoryDataApi, ${JSON.stringify(
            response,
            null,
            2,
          )}`,
        );
      } catch (error) {
        log.error("API 호출 중 에러 발생: userHistoryDataApi");
      } finally {
        setScrollLoading(false);
      }
    };
    if (hasMoreResults) fetchHistoryData();
  }, [page]);

  useEffect(() => {
    if (!lastElement) return;
    const observer = new IntersectionObserver(
      throttle((entries) => {
        setScrollLoading(true);
        if (entries[0].isIntersecting && hasMoreResults) {
          setPage((prev) => prev + 1);
        }
      }, scrollPendingTime), // 스크롤 내린지 0.8초 뒤에 api 호출되도록 설정
      { threshold: 0.9 },
    );
    observer.observe(lastElement);
    return () => observer.disconnect();
  }, [lastElement, hasMoreResults]);

  const setObserverRef = useCallback((node: HTMLTableRowElement) => {
    setLastElement(node); // 해당 <tr> 요소를 관찰 대상으로 지정정
  }, []);

  return { userHistoryData, setObserverRef, scrollLoading };
};
