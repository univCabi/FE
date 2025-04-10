import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import DefaultSearchLayout from "@/components/Search/DefaultSearchLayout";
import SearchInputComponent from "@/components/Search/SearchInputComponent";
import SearchResultDropdownButton from "@/components/Search/SearchResultDropdownButton";
import SearchResultGridButton from "@/components/Search/SearchResultGridButton";
import { useBookmark } from "@/hooks/useBookmark";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinet } from "@/hooks/useCabinet";
import { useSearch } from "@/hooks/useSearch";
import { useSearchInput } from "@/hooks/useSearchInput";
import { useSearchResultButton } from "@/hooks/useSearchResultButton";

const AdminSearchPage = () => {
  const {
    selectedBuilding,
    selectedFloor,
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownOutsideRef,
  } = useBuildingState();
  const {
    selectedCabinet,
    setSelectedCabinet,
    selectedStatus,
    setSelectedStatus,
    expiredAt,
    setExpiredAt,
    isMyCabinet,
    setIsMyCabinet,
    setIsRentAvailable,
    isRentAvailable,
    setUsername,
  } = useCabinet();
  const { fetchClickResultButton } = useSearchResultButton();
  const {
    searchInput,
    searchResults,
    setSearchInput,
    showGridResults,
    inputRef,
    handleSearchSubmit,
    debouncedSearchKeywordApi,
    isLoading,
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
    setIsDropdownOpen,
  });
  const { isBookmark, setIsBookmark } = useBookmark({
    selectedCabinet,
  });

  return (
    <>
      <>
        {/* 검색 입력창 */}
        <div className="flex flex-col items-center" ref={dropdownOutsideRef}>
          <SearchInputComponent
            searchInput={searchInput}
            inputRef={inputRef}
            handleInputRelatedSearch={handleInputRelatedSearch}
            handleSearchSubmit={handleSearchSubmit}
            handleDropdown={handleDropdown}
            submitSearchResultDropdown={submitSearchResultDropdown}
          />

          {/* 검색 결과(드롭다운) */}
          {searchInput && isDropdownOpen && (
            <SearchResultDropdownButton
              searchResults={searchResults}
              slicedSearchResults={slicedSearchResults}
              fetchClickResultButton={fetchClickResultButton}
              setIsDropdownOpen={setIsDropdownOpen}
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
                fetchClickResultButton={fetchClickResultButton}
                isLoading={isLoading}
                hasMoreResults={hasMoreResults}
              />
            </div>
          )}
        </div>

        {/* 검색 결과 없을 때 나오는 컴포넌트 */}
        {searchResults.length === 0 && <DefaultSearchLayout />}
      </>

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
          selectedStatus={selectedStatus as string}
          setSelectedStatus={setSelectedStatus}
          setExpiredAt={setExpiredAt}
          setSelectedCabinet={setSelectedCabinet}
          expiredAt={expiredAt}
          isMyCabinet={isMyCabinet as boolean}
          setIsMyCabinet={setIsMyCabinet}
          setUsername={setUsername}
          isRentAvailable={isRentAvailable as boolean}
          setIsRentAvailable={setIsRentAvailable}
          isBookmark={isBookmark as boolean}
          setIsBookmark={setIsBookmark}
        />
      </div>
    </>
  );
};
export default AdminSearchPage;
