// search에 대한 hook (submit, API, 무한스크롤)

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce, throttle } from "lodash";
import { log } from "@/utils/logger";
import { searchResultsApi } from "@/api/searchResultsApi";
import { searchKeywordApi } from "@/api/searchKeywordApi";

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // searchInput 값에 대한 쿼리스트링
  const [searchResults, setSearchResults] = useState<
    { building: string; floor: number; cabinetNumber: number }[]
  >([]); // 검색 결과 저장
  const [showGridResults, setShowGridResults] = useState(false); // 검색 결과 그리드 표시 여부
  const inputRef = useRef<HTMLInputElement | null>(null); // input focus에 대한 참조

  // 무한스크롤 관련
  const [page, setPage] = useState(1); // 시작 페이지 = 1
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true); // 데이터가 더 있는지
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 무한스크롤 영역 ref

  // Form Submit
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // form submit 시 페이지 새로고침 방지
    // submit 하면 input 포커스 아웃
    if (inputRef.current) {
      inputRef.current.blur();
    }
    // 상태 초기화
    setSearchResults([]); // 기존 검색 결과 초기화
    setPage(1); // 첫 번째 페이지로 초기화
    setHasMoreResults(true); // 검색 가능 상태로 설정
    setShowGridResults(false); // 초기화 동안 그리드 숨기기
    setIsLoading(false);

    await fetchSearchResults(1); // 1페이지 데이터 가져오기
  };

  // API
  // 검색 API 호출
  const fetchSearchKeyword = async (keyword: string) => {
    setSearchParams({ keyword });
    if (keyword) {
      try {
        const response = await searchKeywordApi(keyword);
        setSearchResults(response);
        setShowGridResults(false);
        log.info(
          `API 호출 성공: searchKeywordApi, ${JSON.stringify(
            response,
            null,
            2
          )}`
        );
      } catch (error) {
        log.error("API 호출 중 에러 발생: searchKeywordApi");
      }
    }
  };
  // debounce 적용된 API 호출 함수
  const debouncedSearchKeywordApi = useCallback(
    debounce((keyword) => fetchSearchKeyword(keyword), 200),
    []
  );

  // 무한스크롤
  // 검색 결과를 가져오는 함수
  const fetchSearchResults = async (page: number) => {
    if (isLoading || (!hasMoreResults && page !== 1)) return;
    try {
      setIsLoading(true);
      const response = await searchResultsApi(searchInput, page);
      const data = response.data;

      setSearchResults((prev) => [...prev, ...data.results]);
      setHasMoreResults(data.next != null); // 다음 페이지 여부 확인
      setShowGridResults(true); // 그리드 표시

      if (data.next !== null) {
        setPage((prevPage) => prevPage + 1); // next가 있으면, 다음 페이지로 이동
      } else {
        setIsLoading(false);
        // 마지막 페이지인 경우 로딩 종료
      }
      log.info(
        `API 호출 성공: searchResultsApi, ${JSON.stringify(data, null, 2)}`
      );
    } catch (error) {
      log.error("API 호출 중 에러 발생: searchResultsApi");
    } finally {
      setTimeout(() => setIsLoading(false), 1000); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop - clientHeight < 50) {
        fetchSearchResults(page);
      }
    }, 800); // 스크롤 내린지 0.8초 뒤에 api 호출
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMoreResults, isLoading, searchInput]);

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
    handleSearchSubmit,
    fetchSearchKeyword,
    debouncedSearchKeywordApi,

    page,
    setPage,
    isLoading,
    setIsLoading,
    hasMoreResults,
    setHasMoreResults,
    fetchSearchResults,
    scrollContainerRef,
  };
};
