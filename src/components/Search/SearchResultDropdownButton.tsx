// 검색 결과 - 드롭다운에 대한 컴포넌트

import { useSearchResultButton } from "@/hooks/useSearchResultButton";

interface SearchResultDropdowndButtonProps {
  searchResults: { building: string; floor: number; cabinetNumber: number }[]; // 검색 결과
  slicedSearchResults: number; // 드롭다운 결과 6개씩 노출하기 위한 변수 타입
  handleClickResultButton: (building: string, floor: number) => void; // 결과 드롭다운 버튼
  setIsOpen: (isOpen: boolean) => void; // 드롭다운 상태
}

const SearchResultDropdowndButton = ({
  searchResults,
  slicedSearchResults,
  handleClickResultButton,
  setIsOpen,
}: SearchResultDropdowndButtonProps) => {
  return (
    <div className="relative top-full left-[4.5rem] w-80 mt-2 bg-white rounded-md shadow-lg z-30">
      {searchResults.length > 0 ? (
        // 검색 결과 보여줄 때 6개씩 보이게 구현
        searchResults.slice(0, slicedSearchResults).map((result, index) => (
          <button
            key={index}
            onClick={(e) => {
              handleClickResultButton(result.building, result.floor);
              setIsOpen(false);
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
