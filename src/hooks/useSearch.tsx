// search에 대한 hook

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // searchInput 값에 대한 쿼리스트링
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 저장 -> hook : number타입
  const [showGridResults, setShowGridResults] = useState(false); // 검색 결과 그리드 표시 여부

  return {
    searchInput,
    setSearchInput,
    searchParams,
    setSearchParams,
    searchResults,
    setSearchResults,
    showGridResults,
    setShowGridResults,
  };
};
