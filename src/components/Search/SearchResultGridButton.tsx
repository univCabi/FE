// 검색 결과 - 결과 grid에 대한 컴포넌트

interface SearchResultGridButtonProps {
  searchResults: { building: string; floor: number; cabinetNumber: number }[];
  handleClickResultButton: (building: string, floor: number) => void;
}

const SearchResultGridButton = ({
  searchResults,
  handleClickResultButton,
}: SearchResultGridButtonProps) => {
  return (
    <div className="grid pt-28 px-28 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
      {searchResults.map((result, index) => (
        <button
          key={index}
          onClick={() => handleClickResultButton(result.building, result.floor)}
          className="bg-gray-300 hover:bg-gray-200 rounded-md px-16 py-16 text-center shadow-sm min-w-32"
        >
          {result.building} {result.floor}F {result.cabinetNumber}번
        </button>
      ))}
    </div>
  );
};
export default SearchResultGridButton;
