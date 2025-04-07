import { useCallback, useEffect, useState } from "react";
import { throttle } from "lodash";
import { AdminListTableType } from "@/types/ListType";
import { CabinetStatusType } from "@/types/StatusEnum";
import { log } from "@/utils/logger";
import { adminCabinetStatusListApi } from "@/api/adminCabinetStatusListApi";

export const useOverdueCabinetListData = () => {
  const [overdueCabinetData, setOverdueCabinetData] = useState<
    AdminListTableType[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true);
  const [lastElement, setLastElement] = useState<HTMLTableRowElement | null>(
    null,
  );
  const [isScrollLoading, setIsScrollLoading] = useState<boolean>(false);
  const status: CabinetStatusType = "OVERDUE";
  const pageSize: number = 5;
  const scrollPendingTime: number = 800;

  useEffect(() => {
    const fetchOverdueCabinetData = async () => {
      try {
        const response = await adminCabinetStatusListApi(
          status,
          page,
          pageSize,
        );
        if (response.data.results.length === 0) {
          setHasMoreResults(false);
        } else {
          setOverdueCabinetData((prev) => [...prev, ...response.data.results]);
        }
        log.info(
          `API 호출 성공: adminCabinetStatusListApi, ${JSON.stringify(
            response,
            null,
            2,
          )}`,
        );
      } catch (error) {
        log.error(`API 호출 중 에러 발생: adminCabinetStatusListApi ${error}`);
      } finally {
        setIsScrollLoading(false);
      }
    };
    if (hasMoreResults) fetchOverdueCabinetData();
  }, [page]);

  useEffect(() => {
    if (!lastElement) return;
    const observer = new IntersectionObserver(
      throttle((entries) => {
        setIsScrollLoading(true);
        if (entries[0].isIntersecting && hasMoreResults) {
          setPage((prev) => prev + 1);
        }
      }, scrollPendingTime),
      { threshold: 0.9 },
    );
    observer.observe(lastElement);
    return () => observer.disconnect();
  }, [lastElement, hasMoreResults]);

  const setObserverRef = useCallback((node: HTMLTableRowElement) => {
    setLastElement(node);
  }, []);

  return { overdueCabinetData, setObserverRef, isScrollLoading };
};
