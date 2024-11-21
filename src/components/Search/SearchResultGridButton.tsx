// 검색 결과 - 결과 grid에 대한 컴포넌트

interface SearchResultGridButtonProps {
  searchResults: { building: string; floor: number; cabinetNumber: number }[];
  handleClickResultButton: (building: string, floor: number) => void;
  loading: boolean;
  hasMoreResults: boolean;
}

const SearchResultGridButton = ({
  searchResults,
  handleClickResultButton,
  loading,
  hasMoreResults,
}: SearchResultGridButtonProps) => {
  return (
    <div>
      <div className="grid pt-28 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 px-4 sm:px-8 md:px-16 lg:px-24">
        {searchResults.map((result, index) => (
          <button
            key={index}
            onClick={() =>
              handleClickResultButton(result.building, result.floor)
            }
            className="bg-gray-300 hover:bg-gray-200 rounded-md p-16 text-center shadow-sm min-w-32"
          >
            {result.building} {result.floor}F {result.cabinetNumber}번
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        {loading && <p>Loading...</p>}
        {!hasMoreResults && <p>No More Results</p>}
      </div>
    </div>
  );
};
export default SearchResultGridButton;
