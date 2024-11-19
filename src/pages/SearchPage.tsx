import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearch } from "@/hooks/useSearch";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinetState } from "@/hooks/useCabinetState";
import { useSearchResultButton } from "@/hooks/useSearchResultButton";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import DefaultSearchComponent from "@/components/Search/DefaultSearchComponent";
import SearchResultGridButton from "@/components/Search/SearchResultGridButton";
import SearchResultDropdownButton from "@/components/Search/SearchResultDropdownButton";
import SearchInput from "@/components/Search/SearchInput";

// 분리해야됨
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;

const SearchPage = () => {
  const { buildings } = useBuildingList();
  const {
    selectedBuilding,
    setSelectedBuilding,
    selectedFloor,
    setSelectedFloor,
    isOpen,
    setIsOpen,
    dropdownOutsideRef,
  } = useBuildingState();
  const {
    searchInput,
    setSearchInput,
    searchResults,
    setSearchResults,
    showGridResults,
    inputRef,
    debouncedSearchKeywordApi,
  } = useSearch();
  const { selectedCabinet, setSelectedCabinet } = useCabinetState();
  const { handleClickResultButton } = useSearchResultButton();

  // 검색 결과 6개씩 보여주기 위한 변수
  const slicedSearchResults = 6;

  // searchInput 변경 시마다 디바운스 적용된 API 호출
  const handleInputRelatedSearch = (e) => {
    const keyword = e.target.value;
    setSearchInput(keyword);
    debouncedSearchKeywordApi(keyword);
  };

  // 검색 결과 드롭다운 관련 함수 //
  // (외부 클릭 & submit => 검색 결과 드롭다운 숨기기)
  const submitSearchResultDropdown = () => {
    setIsOpen(false);
  };
  // input에 focus 상태일 때만 드롭다운 활성화
  const handleDropdown = () => {
    setIsOpen(true);
  };

  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  // submit 되면 API 호출
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // form submit 시 페이지 새로고침 방지
    if (inputRef.current) {
      inputRef.current.blur();
    }
    try {
      const response = await axios.get(
        `${SEARCH_URL}/detail?keyword=${searchInput}`
      );
      // 초기 데이터 설정
      setSearchResults(response.data.results);
      setNext(response.data.next);
      setHasMoreResults(response.data.next); // 다음 URL 존재 여부 설정

      console.log("Next URL:", next);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  // 검색 결과를 가져오는 함수
  const fetchSearchResults = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const { results, next } = response.data;

      setSearchResults((prev) => [...prev, ...results]);
      setNext(next);
      setHasMoreResults(next);
    } catch (error) {
      console.error("검색 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 무한 스크롤 트리거
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 무한스크롤 영역 ref

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = throttle(() => {
      if (!hasMoreResults || loading || !next) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        console.log("Loading next page:", next);
        fetchSearchResults(next);
      }
    }, 800); // 스크롤 내린지 0.8초 뒤에 api 호출

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [next, hasMoreResults, loading]);

  return (
    <div>
      <SideNavigationLayout
        buildings={buildings}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        setSelectedFloor={setSelectedFloor}
        setSelectedCabinet={setSelectedCabinet}
      />

      {/* 검색 관련 */}
      <div>
        {/* 검색 입력창 */}
        <div className="flex flex-col items-center" ref={dropdownOutsideRef}>
          <SearchInput
            searchInput={searchInput}
            inputRef={inputRef}
            handleInputRelatedSearch={handleInputRelatedSearch}
            handleSearchSubmit={handleSearchSubmit}
            handleDropdown={handleDropdown}
            submitSearchResultDropdown={submitSearchResultDropdown}
          />

          {/* 검색 결과(드롭다운) */}
          {searchInput && isOpen && (
            <SearchResultDropdownButton
              searchResults={searchResults}
              slicedSearchResults={slicedSearchResults}
              handleClickResultButton={handleClickResultButton}
              setIsOpen={setIsOpen}
            />
          )}
        </div>

        {/* 검색 결과(버튼) -> 이 부분만 무한스크롤 */}
        <div className="absolute inset-y-0 left-40 right-80">
          {showGridResults && searchResults.length > 0 && (
            <div
              ref={scrollContainerRef}
              className="h-full overflow-y-scroll pb-3"
            >
              <SearchResultGridButton
                searchResults={searchResults}
                handleClickResultButton={handleClickResultButton}
              />
              {loading && <p>Loading...</p>}
              {!hasMoreResults && <p className="mt-3">No More Results</p>}
            </div>
          )}
        </div>

        {/* 검색 결과 없을 때 나오는 컴포넌트 */}
        {searchResults.length === 0 && <DefaultSearchComponent />}
      </div>

      {/* 건물 정보(좌측) */}
      <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex-col pt-20 hidden md:flex">
        {/* 하단 메뉴(좌측) */}
        <CabinetFooterMenuButton />
      </div>

      {/* 선택한 사물함 정보(우측) */}
      <div className="absolute inset-y-0 right-0 w-80 border-gray-400 border-l-2 pt-20 hidden md:flex">
        <SelectedCabinetInformation
          selectedBuilding={selectedBuilding}
          selectedFloor={selectedFloor}
          selectedCabinet={selectedCabinet}
        />
      </div>
    </div>
  );
};
export default SearchPage;
