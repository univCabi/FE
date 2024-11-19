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
  const { selectedCabinet, setSelectedCabinet } = useCabinetState();
  const { handleClickResultButton } = useSearchResultButton();
  const {
    searchInput,
    setSearchInput,
    searchResults,
    setSearchResults,
    showGridResults,
    setShowGridResults,
    inputRef,
    debouncedSearchKeywordApi,
    fetchSearchResults,
    setPage,
    loading,
    setLoading,
    hasMoreResults,
    setHasMoreResults,
    scrollContainerRef,
  } = useSearch();

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
    setLoading(false);

    await fetchSearchResults(1); // 1페이지 데이터 가져오기
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

        <div className="absolute inset-y-0 left-40 right-40 md:right-80">
          {showGridResults && searchResults.length > 0 && (
            <div
              ref={scrollContainerRef}
              className="h-full pb-6 overflow-y-scroll"
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
