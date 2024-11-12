import { useNavigate } from "react-router";
import { debounce } from "lodash";
import { useCallback, useRef } from "react";
import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearch } from "@/hooks/useSearch";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinetState } from "@/hooks/useCabinetState";
import { searchKeywordApi } from "@/api/searchKeywordApi";
import { searchResultButtonCallApi } from "@/api/searchResultButtonCallApi";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import LogoSVG from "@/icons/cabiLogo.svg?react";
import SearchSVG from "@/icons/search.svg?react";

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
    setSearchResults,
    showGridResults,
    setShowGridResults,
    inputRef,
  } = useSearch();
  const { selectedCabinet } = useCabinetState();
  const navigate = useNavigate();

  // 검색 API 호출
  const handleSearchKeyword = async (keyword) => {
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

  // 버튼 클릭 시 cabinet에 대한 API 요청
  const handleClickResultButton = async (building, floor) => {
    try {
      const response = await searchResultButtonCallApi(building, floor);
      navigate(`/main?building=${building}&floor=${floor}`); // 선택한 사물함 페이지로 이동
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // debounce 적용된 API 호출 함수
  const debouncedSearchKeywordApi = useCallback(
    debounce((keyword) => {
      handleSearchKeyword(keyword);
    }, 200), // 2초 후에 API 호출
    []
  );

  // searchInput 변경 시마다 디바운스 적용된 API 호출
  const handleInputRelatedSearch = (e) => {
    const keyword = e.target.value;
    setSearchInput(keyword);
    debouncedSearchKeywordApi(keyword);
  };

  // submit 되면 API 호출
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchKeyword(searchInput);
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
          <form
            onSubmit={handleSearchSubmit}
            className="flex space-x-2 mt-[0.9rem] z-20 items-center relative left-[5.5rem]"
          >
            <input
              type="text"
              value={searchInput}
              ref={inputRef}
              onChange={handleInputRelatedSearch}
              onClick={handleDropdown} // input 클릭하면 드롭다운 활성화
              onFocus={handleDropdown} // focus 되어 있을 때만 드롭다운 활성화
              placeholder="사물함 번호를 입력하세요"
              className="p-2 rounded-md bg-white text-black w-80"
            />
            <button type="submit" onClick={submitSearchResultDropdown}>
              <SearchSVG />
            </button>
          </form>

          {/* 검색 결과(드롭다운) */}
          {searchInput && isOpen && (
            <div className="relative top-full left-[4.5rem] w-80 mt-2 bg-white rounded-md shadow-lg z-30">
              {searchResults.length > 0 ? (
                // 검색 결과 보여줄 때 6개씩 보이게 구현
                searchResults.slice(0, 6).map((result, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      handleClickResultButton(result.building, result.floor);
                      setIsOpen(false);
                    }}
                    className="block my-1 p-3 w-full text-left hover:bg-blue-400 hover:text-white rounded-md"
                  >
                    {result.building} {result.floor}F {result.cabinetNumber}번
                  </button>
                ))
              ) : (
                <div className="block my-1 p-3 w-full text-left rounded-md">
                  <p>결과 없음</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 검색 결과(버튼) */}
        <div className="absolute inset-y-0 left-40 right-80">
          {showGridResults && searchResults.length > 0 && (
            <div className="grid pt-52 px-28 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleClickResultButton(result.building, result.floor);
                  }}
                  className="bg-gray-300 hover:bg-gray-200 rounded-md px-8 py-10 text-center shadow-sm min-w-32"
                >
                  {result.building} {result.floor}F {result.cabinetNumber}번
                </button>
              ))}
            </div>
          )}
        </div>

        {searchResults.length === 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center space-y-4">
              <LogoSVG />
              <p>사물함 번호를 입력하세요</p>
            </div>
          </div>
        )}
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
