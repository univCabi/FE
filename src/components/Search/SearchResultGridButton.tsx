import { SearchResult } from "@/types/SearchType";
import LogoSVG from "@/icons/cabiLogo.svg?react";

// 검색 결과 - 결과 grid에 대한 컴포넌트

interface SearchResultGridButtonProps {
  searchResults: SearchResult[];
  fetchClickResultButton: (
    building: string,
    floor: number,
    cabinetNumber: number,
  ) => void;
  isLoading: boolean;
  hasMoreResults: boolean;
}

const SearchResultGridButton = ({
  searchResults,
  fetchClickResultButton,
  isLoading,
}: SearchResultGridButtonProps) => {
  return (
    <>
      <div className="grid pt-28 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 px-4 sm:px-8 md:px-16 lg:px-24">
        {searchResults.map((result, index) => (
          <button
            key={index}
            onClick={() =>
              fetchClickResultButton(
                result.building,
                result.floor,
                result.cabinetNumber,
              )
            }
            className="bg-gray-300 hover:bg-gray-200 rounded-md  shadow-sm min-w-32 h-40"
          >
            {result.building} {result.floor}F {result.cabinetNumber}번
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        {isLoading && (
          <div className="flex justify-center bg-white items-center">
            <LogoSVG className="animate-spin" width={40} height={50} />
          </div>
        )}
      </div>
    </>
  );
};
export default SearchResultGridButton;
