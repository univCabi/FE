// Search Page - input에 대한 결과 드롭다운 hook

interface useSearchHandlersProps {
  setSearchInput: (input: string) => void;
  debouncedSearchKeywordApi: (keyword: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSearchInput = ({
  setSearchInput,
  debouncedSearchKeywordApi,
  setIsOpen,
}: useSearchHandlersProps) => {
  // 검색 결과 6개씩 보여주기 위한 변수
  const slicedSearchResults = 6;

  // searchInput 변경 시마다 디바운스 적용된 API 호출
  const handleInputRelatedSearch = (e) => {
    const keyword = e.target.value;
    setSearchInput(keyword);
    debouncedSearchKeywordApi(keyword);
  };

  // 검색 결과 드롭다운 관련 함수
  // (외부 클릭 & submit => 검색 결과 드롭다운 숨기기)
  const submitSearchResultDropdown = () => {
    setIsOpen(false);
  };

  //   input에 focus 상태일 때만 드롭다운 활성화
  const handleDropdown = () => {
    setIsOpen(true);
  };

  return {
    slicedSearchResults,
    handleInputRelatedSearch,
    submitSearchResultDropdown,
    handleDropdown,
  };
};
