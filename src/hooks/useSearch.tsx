// search에 대한 hook

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce, throttle } from "lodash";
import { searchResultsApi } from "@/api/searchResultsApi";
import { searchKeywordApi } from "@/api/searchKeywordApi";

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // searchInput 값에 대한 쿼리스트링
  const [searchResults, setSearchResults] = useState<number[]>([]); // 검색 결과 저장 -> hook : number타입
  const [showGridResults, setShowGridResults] = useState(false); // 검색 결과 그리드 표시 여부
  const inputRef = useRef<HTMLInputElement | null>(null); // input focus에 대한 참조

  // 무한스크롤 관련
  const [page, setPage] = useState(1); // 시작 페이지 = 1
  const [loading, setLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true); // 데이터가 더 있는지
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 무한스크롤 영역 ref

  // 검색 API 호출
  const handleSearchKeyword = async (keyword: string) => {
    setSearchParams({ keyword });
    if (keyword) {
      try {
        const response = await searchKeywordApi(keyword);
        setSearchResults(response);
        setShowGridResults(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  // debounce 적용된 API 호출 함수
  const debouncedSearchKeywordApi = useCallback(
    debounce((keyword) => handleSearchKeyword(keyword), 200),
    []
  );

  // 무한스크롤
  // 검색 결과를 가져오는 함수
  const fetchSearchResults = async (page: number) => {
    if (loading || (!hasMoreResults && page !== 1)) return;
    setLoading(true);
    try {
      const response = await searchResultsApi(searchInput, page);
      const data = response.data;

      setSearchResults((prev) => [...prev, ...data.results]);
      setHasMoreResults(data.next != null); // 다음 페이지 여부 확인
      setShowGridResults(true); // 그리드 표시

      if (data.next !== null) {
        setPage((prevPage) => prevPage + 1); // next가 있으면, 다음 페이지로 이동
      } else {
        setLoading(false); // 마지막 페이지인 경우 로딩 종료
      }
      console.log("현재 페이지", page);
    } catch (error) {
      console.error("검색 실패:", error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = throttle((keyword) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        fetchSearchResults(page);
      }
    }, 800); // 스크롤 내린지 0.8초 뒤에 api 호출
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMoreResults, loading, searchInput]);

  return {
    searchInput,
    setSearchInput,
    searchParams,
    setSearchParams,
    searchResults,
    setSearchResults,
    showGridResults,
    setShowGridResults,
    inputRef,
    handleSearchKeyword,
    debouncedSearchKeywordApi,

    page,
    setPage,
    loading,
    setLoading,
    hasMoreResults,
    setHasMoreResults,
    fetchSearchResults,
    scrollContainerRef,
  };
};
