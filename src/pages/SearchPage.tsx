import { useBuildingList } from "@/hooks/useBuildingList";
import { useSearchInput } from "@/hooks/useSearchInput";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinetState } from "@/hooks/useCabinetState";
import { useNavigate } from "react-router";
import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import SideNavigationLayout from "@/pages/SideNavigationLayout";
import SelectedCabinetInformation from "@/components/Cabinet/SelectedCabinetInformation";
import LogoSVG from "@/icons/cabiLogo.svg?react";
import SearchSVG from "@/icons/search.svg?react";
import axios from "axios";

import { debounce } from "lodash";
import { useCallback, useState } from "react";

const SearchPage = () => {
  const { buildings } = useBuildingList();
  const {
    selectedBuilding,
    setSelectedBuilding,
    setSelectedFloor,
    isOpen,
    setIsOpen,
  } = useBuildingState();
  const { searchInput, setSearchInput, searchParams, setSearchParams } =
    useSearchInput();
  const { selectedCabinet } = useCabinetState();

  const [searchResults, setSearchResults] = useState([]); // 검색 결과 저장 -> hook : number타입
  const [showGridResults, setShowGridResults] = useState(false); // 검색 결과 그리드 표시 여부

  const navigate = useNavigate();

  // input창 클릭 -> /search로 이동
  const handleInputClick = () => {
    navigate({
      pathname: "/search",
      search: searchParams.toString(),
    });
  };

  // 검색 API 호출 후 결과 저장
  const searchKeywordApi = async (keyword) => {
    setSearchParams({ keyword: String(keyword) });
    if (keyword) {
      try {
        const response = await axios.get(
          `http://localhost:8000/cabinet/search/detail?keyword=${keyword}`
        );
        // 검색 결과에 해당되는 데이터만 추출
        const filterData = response.data.filter((inputValue) => {
          return inputValue.cabinetNumber.toString().includes(keyword);
        });

        setSearchResults(filterData); // 검색 결과 저장
        // setSearchResults(response.data); // 추후 삭제 예정
        setShowGridResults(true);
        console.log(filterData); // 추후 삭제
      } catch (error) {
        console.error(error);
      }
    }
  };

  // searchInput 변경 시마다 API 호출 (디바운스 적용)
  const handleInputRelatedSearch = (e) => {
    const keyword = e.target.value;
    setSearchInput(keyword);

    debouncedSearchKeywordApi(keyword);
  };

  // submit 되면 api 호출
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchKeywordApi(searchInput);
  };

  // debounce 적용된 API 호출 함수
  const debouncedSearchKeywordApi = useCallback(
    debounce((keyword) => {
      searchKeywordApi(keyword);
    }, 200), // 3초 후에 API 호출
    []
  );

  // 버튼 클릭 시 cabinet에 대한 api 요청
  const clickedResultButtonCallApi = async (
    building: string,
    floor: number
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/cabinet?building=${building}&floor=${floor}`
      );
      console.log(response.data);
      // navigate(`/main?building=${building}&floor=${floor}`); // 선택한 사물함 페이지로 이동
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SideNavigationLayout
        buildings={buildings}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        setSelectedFloor={setSelectedFloor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* 검색 입력창 */}
      <div>
        <div className="flex flex-col items-center relative left-[5.5rem]">
          <form
            onSubmit={handleSearchSubmit}
            className="flex space-x-2 mt-[0.95rem] z-20 items-center"
          >
            <input
              type="text"
              value={searchInput}
              onChange={handleInputRelatedSearch}
              onClick={handleInputClick}
              placeholder="사물함 번호를 입력하세요"
              className="p-2 rounded-md bg-white text-black w-80"
            />
            <button type="submit">
              <SearchSVG />
            </button>
          </form>
          {/* 검색 결과(드롭다운) */}
          {searchInput && (
            <div className="relative top-full -left-4 w-80 mt-2 bg-white rounded-md shadow-lg z-30">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      clickedResultButtonCallApi(result.building, result.floor);
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

        {/* 검색 결과 버튼 형식 출력 */}
        <div className="absolute inset-y-0 left-40 right-80">
          {showGridResults && searchResults.length > 0 && (
            <div className="absolute top-1/3 grid grid-cols-4 gap-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => {
                    clickedResultButtonCallApi(result.building, result.floor);
                  }}
                  className="bg-gray-300 hover:bg-gray-200 rounded-md px-8 py-10 text-center shadow-sm"
                >
                  {result.building} {result.cabinetNumber}번
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
      <div className="absolute inset-y-0 right-0 w-80 border-gray-400 border-l-2 pt-20">
        <SelectedCabinetInformation selectedCabinet={selectedCabinet} />
      </div>
    </div>
  );
};
export default SearchPage;
