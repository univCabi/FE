import { useEffect, useState } from "react";
import { SelectedCabinet } from "@/types/CabinetType";
import { log } from "@/utils/logger";
import {
  addBookmarkApi,
  bookmarkListApi,
  removeBookmarkApi,
} from "@/api/bookmarkApi";

interface UseBookmarkProps {
  selectedCabinet: SelectedCabinet | null;
}
export const useBookmark = ({ selectedCabinet }: UseBookmarkProps) => {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [bookmarkIds, setBookmarkIds] = useState<number[]>([]);

  const fetchBookmarkList = async () => {
    try {
      const response = await bookmarkListApi();
      const cabinetIds = response.data.map((item: { id: number }) => item.id);
      setBookmarkIds(cabinetIds);
    } catch (error) {
      log.error(`API 호출 중 에러 발생: fetchBookmarkList ${error}`);
    }
  };

  const fetchBookmarkAdd = async () => {
    if (!selectedCabinet) return;
    if (isBookmark === false) {
      try {
        const response = await addBookmarkApi(selectedCabinet.cabinetId);
        setIsBookmark(response.data.isBookmark);
      } catch (error) {
        log.error(`API 호출 중 에러 발생: fetchBookmarkAdd ${error}`);
      }
    }
  };
  const fetchBookmarkRemove = async () => {
    if (!selectedCabinet) return;
    if (isBookmark === true) {
      try {
        const response = await removeBookmarkApi(selectedCabinet.cabinetId);
        setIsBookmark(response.data.isBookmark);
      } catch (error) {
        log.error(`API 호출 중 에러 발생: fetchBookmarkRemove ${error}`);
      }
    }
  };

  useEffect(() => {
    if (
      location.pathname.startsWith("/main") ||
      location.pathname.startsWith("/available")
    ) {
      if (selectedCabinet) {
        setIsBookmark(bookmarkIds.includes(selectedCabinet.cabinetId));
      }
    }
  }, [selectedCabinet, bookmarkIds]);

  useEffect(() => {
    if (
      location.pathname.startsWith("/main") ||
      location.pathname.startsWith("/available")
    ) {
      fetchBookmarkList();
    }
  }, [isBookmark]);

  return {
    fetchBookmarkAdd,
    fetchBookmarkRemove,
    isBookmark,
    setIsBookmark,
    fetchBookmarkList,
    bookmarkIds,
    setBookmarkIds,
  };
};
