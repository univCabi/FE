// search에 대한 hook

import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchKeywordApi } from "@/api/searchKeywordApi";
import { debounce } from "lodash";

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // searchInput 값에 대한 쿼리스트링
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 저장 -> hook : number타입
  const [showGridResults, setShowGridResults] = useState(false); // 검색 결과 그리드 표시 여부
  const inputRef = useRef<HTMLInputElement | null>(null); // input focus에 대한 참조

  // 검색 API 호출
  const handleSearchKeyword = async (
    keyword: string,
    setSearchParams: (params: { keyword: string }) => void
  ) => {
    setSearchParams({ keyword });
    if (keyword) {
      try {
        const response = await searchKeywordApi(keyword);
        setSearchResults(response);
        setShowGridResults(true);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // debounce 적용된 API 호출 함수
  const debouncedSearchKeywordApi = useCallback(
    debounce((keyword) => {
      handleSearchKeyword(keyword, setSearchParams);
    }, 200), // 2초 후에 API 호출
    []
  );

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
  };
};
