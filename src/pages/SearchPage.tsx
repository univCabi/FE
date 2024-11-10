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

import { useEffect, useRef, useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const { buildings } = useBuildingList();
  const {
    selectedBuilding,
    setSelectedBuilding,
    setSelectedFloor,
    isOpen,
    setIsOpen,
  } = useBuildingState();
  const { searchInput, setSearchInput, filteredBuildings } = useSearchInput();
  const { selectedCabinet } = useCabinetState();
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 저장 -> hook
  const { searchParams, setSearchParams } = useSearchInput();

  const [showGridResults, setShowGridResults] = useState(false); // 검색 결과 그리드 표시 여부
  const navigate = useNavigate();

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
        setSearchResults(response.data); // 검색 결과 저장
        setShowGridResults(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 버튼 클릭 시 cabinet에 대한 api 요청
  const clickedResultButtonCallApi = async (building, floor) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/cabinet?building=${building}&floor=${floor}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchKeywordApi(searchInput);
  };
  // const dropdownSearchResults = searchResults.slice(0, 5);

  // searchInput을 기준으로 filteredBuildings 필터링
  const filteredBuildingsBySearch = searchResults.filter((inputValue) => {
    return inputValue.cabinetNumber.toString().includes(searchInput); // no가 searchInput을 포함하는 경우만 필터링
  });

  return (
    <div>
      <SideNavigationLayout
        buildings={buildings}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        setSelectedFloor={setSelectedFloor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchInput={searchInput} // 검색창 입력값
        setSearchInput={setSearchInput} // 검색창 입력값
      />

      {/* 검색 입력창 */}
      <div className="flex flex-col items-center relative left-24">
        <form
          onSubmit={handleSearchSubmit}
          className="flex space-x-2 mt-4 z-20"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
            {filteredBuildingsBySearch.length > 0 ? (
              filteredBuildingsBySearch.map((result, index) => (
                <button
                  key={index}
                  onClick={() => {
                    clickedResultButtonCallApi(result.building, result.floor);
                  }}
                  className="block my-1 p-3 w-full text-left hover:bg-blue-400 hover:text-white rounded-md"
                >
                  {result.building} {result.cabinetNumber}번
                  {/* 'name no번' 형식으로 출력 */}
                </button>
              ))
            ) : (
              <div className="block my-1 p-3 w-full text-left rounded-md">
                <p>결과 없음</p>
              </div>
            )}
          </div>
        )}

        {/* 검색 결과 버튼 형식 출력 */}
        {showGridResults && filteredBuildingsBySearch.length > 0 && (
          <div className="absolute inset-y-0 left-40 right-80 top-52 grid grid-cols-4 gap-8 p-8">
            {filteredBuildingsBySearch.map((result, index) => (
              <button
                key={index}
                onClick={() => {
                  clickedResultButtonCallApi(result.building, result.floor);
                }}
                className="bg-gray-300 hover:bg-gray-200 rounded-md p-8 text-center shadow-sm"
              >
                {result.building} {result.cabinetNumber}번
              </button>
            ))}
          </div>
        )}

        {searchResults.length === 0 && (
          <div className="absolute inset-y-0 left-16 right-80 p-20 mt-96">
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
