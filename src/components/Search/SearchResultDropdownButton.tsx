import { SearchResult } from "@/types/SearchType";

// 검색 결과 - 드롭다운에 대한 컴포넌트

interface SearchResultDropdowndButtonProps {
  searchResults: SearchResult[];
  slicedSearchResults: number; // 드롭다운 결과 6개씩 노출하기 위한 변수 타입
  fetchClickResultButton: (
    building: string,
    floor: number,
    cabinetNumber: number,
  ) => void; // 결과 드롭다운 버튼
  setIsDropdownOpen: (isDropdownOpen: boolean) => void; // 드롭다운 상태
}

const SearchResultDropdowndButton = ({
  searchResults,
  slicedSearchResults,
  fetchClickResultButton,
  setIsDropdownOpen,
}: SearchResultDropdowndButtonProps) => {
  return (
    <div className="relative top-full left-[4.5rem] w-80 ml-5 mt-2 bg-white rounded-md shadow-lg z-30">
      {searchResults.length > 0 ? (
        // 검색 결과 보여줄 때 6개씩 보이게 구현
        searchResults.slice(0, slicedSearchResults).map((result, index) => (
          <button
            key={index}
            onClick={() => {
              fetchClickResultButton(
                result.building,
                result.floor,
                result.cabinetNumber,
              );
              setIsDropdownOpen(false);
            }}
            className="block my-1 p-4 w-full text-left hover:bg-blue-400 hover:text-white rounded-md"
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
  );
};
export default SearchResultDropdowndButton;
