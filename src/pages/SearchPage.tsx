import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearch } from "@/hooks/useSearch";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinetState } from "@/hooks/useCabinetState";
import { useSearchResultButton } from "@/hooks/useSearchResultButton";
import { useSearchInput } from "@/hooks/useSearchInput";
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
    searchResults,
    setSearchInput,
    showGridResults,
    inputRef,
    handleSearchSubmit,
    debouncedSearchKeywordApi,
    loading,
    hasMoreResults,
    scrollContainerRef,
  } = useSearch();

  const {
    slicedSearchResults,
    handleInputRelatedSearch,
    submitSearchResultDropdown,
    handleDropdown,
  } = useSearchInput({
    setSearchInput,
    debouncedSearchKeywordApi,
    setIsOpen,
  });

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
              className="h-full pb-4 overflow-y-scroll"
            >
              <SearchResultGridButton
                searchResults={searchResults}
                handleClickResultButton={handleClickResultButton}
                loading={loading}
                hasMoreResults={hasMoreResults}
              />
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
