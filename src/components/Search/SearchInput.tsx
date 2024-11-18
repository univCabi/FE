// 검색 페이지 - input에 대한 컴포넌트

// import { postSearchKeywordApi } from "@/api/postSearchKeywordApi";
import SearchSVG from "@/icons/search.svg?react";
import axios from "axios";

interface SearchInputProps {
  searchInput: string; // input 값 타입
  inputRef: React.RefObject<HTMLInputElement>; // input focus에 대한 참조
  handleInputRelatedSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  handleDropdown: () => void;
  submitSearchResultDropdown: () => void;
}

const SearchInput = ({
  searchInput,
  inputRef,
  handleInputRelatedSearch,
  handleSearchSubmit,
  handleDropdown,
  submitSearchResultDropdown,
}: SearchInputProps) => {
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex space-x-2 mt-[0.9rem] z-20 items-center relative left-[5.5rem]"
    >
      <input
        type="text"
        value={searchInput}
        ref={inputRef}
        onChange={handleInputRelatedSearch}
        onClick={handleDropdown}
        onFocus={handleDropdown}
        placeholder="사물함 번호를 입력하세요"
        className="p-2 rounded-md bg-white text-black w-80"
      />
      <button
        type="submit"
        onClick={() => {
          submitSearchResultDropdown();
        }}
      >
        <SearchSVG />
      </button>
    </form>
  );
};

export default SearchInput;
