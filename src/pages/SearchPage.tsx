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

import axios from "axios";
import { useRef, useState } from "react";
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
    setSearchParams,
    searchResults,
    setSearchResults,
    showGridResults,
    inputRef,
    handleSearchKeyword,
    debouncedSearchKeywordApi,
  } = useSearch();
  const { selectedCabinet, setSelectedCabinet } = useCabinetState();

  const { handleClickResultButton } = useSearchResultButton();
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [isEnd, setIsEnd] = useState(false); // 마지막 페이지 여부
  const scrollTimeoutRef = useRef<any>(null); // 스크롤 타임아웃을 위한 ref
  // const testSearchKeywordApi = async (keyword) => {
  //   try {
  //     const response = await axios.get(
  //       `${SEARCH_URL}/detail?keyword=${keyword}`
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //     // return [];
  //   }
  // };

  // 검색 결과 6개씩 보여주기 위한 변수
  const slicedSearchResults = 6;

  // searchInput 변경 시마다 디바운스 적용된 API 호출
  const handleInputRelatedSearch = (e) => {
    const keyword = e.target.value;
    setSearchInput(keyword);
    debouncedSearchKeywordApi(keyword);
  };

  // submit 되면 API 호출
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   handleSearchKeyword(searchInput, setSearchParams);
  //   // testSearchKeywordApi(searchInput);

  //   if (inputRef.current) {
  //     inputRef.current.blur();
  //   }
  // };
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // form submit 시 페이지 새로고침 방지
    if (inputRef.current) {
      inputRef.current.blur();
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/cabinet/search/detail/?keyword=${searchInput}`
      );
      setSearchResults(response.data.results); // API로부터 받은 결과를 상태에 저장
      console.log(response.data);
    } catch (error) {
      console.error("검색 실패:", error);
    }
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
            // postSearchKeywordApi={postSearchKeywordApi}
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

        {/* 검색 결과(버튼) */}
        <div className="absolute inset-y-0 left-40 right-80">
          {showGridResults && searchResults.length > 0 && (
            <SearchResultGridButton
              searchResults={searchResults}
              handleClickResultButton={handleClickResultButton}
            />
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
