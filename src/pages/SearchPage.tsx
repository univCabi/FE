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
    showGridResults,
    inputRef,
    handleSearchKeyword,
    debouncedSearchKeywordApi,
  } = useSearch();
  const { selectedCabinet } = useCabinetState();
  const { handleClickResultButton } = useSearchResultButton();

  // 검색 결과 6개씩 보여주기 위한 변수
  const slicedSearchResults = 6;

  // searchInput 변경 시마다 디바운스 적용된 API 호출
  const handleInputRelatedSearch = (e) => {
    const keyword = e.target.value;
    setSearchInput(keyword);
    debouncedSearchKeywordApi(keyword);
  };

  // submit 되면 API 호출
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchKeyword(searchInput, setSearchParams);

    if (inputRef.current) {
      inputRef.current.blur();
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
        <SelectedCabinetInformation selectedCabinet={selectedCabinet} />
      </div>
    </div>
  );
};
export default SearchPage;
