import { useLocation, useNavigate } from "react-router";

import LogoSVG from "@/icons/cabiLogo.svg?react";
import AngleDownSVG from "@/icons/angleDown.svg?react";
import SearchSVG from "@/icons/search.svg?react";
import { useEffect, useRef } from "react";

interface NavBuildingProps {
  buildings: { name: string; floors: string[] }[]; // 건물 배열 (name과 floors 포함)
  selectedBuilding: number | null; // 선택된 건물의 인덱스 또는 null
  setSelectedBuilding: (index: number | null) => void; // 선택된 건물을 설정하는 함수
  setSelectedFloor: (floor: number | null) => void; // 선택된 층을 설정하는 함수
  isOpen: boolean; // 드롭다운 on/off 상태
  setIsOpen: (isOpen: boolean) => void; // 드롭다운 상태를 설정하는 함수
  searchInput: string; // search 관련
  setSearchInput: (value: string) => void; // search 관련
}

const SideNavigationLayout = ({
  buildings,
  selectedBuilding,
  setSelectedBuilding,
  setSelectedFloor,
  isOpen,
  setIsOpen,
  searchInput,
  setSearchInput,
}: NavBuildingProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // hook으로 분리해야 할 것들
  const dropdownOutsideRef = useRef(null); // 분리 (드롭다운 외부 클릭)

  // nav바 로고 우측 드롭다운 관련(드롭다운 외부 클릭시 드롭다운 닫음)
  useEffect(() => {
    const handleClickedDropdownOutside = (e) => {
      if (
        dropdownOutsideRef.current &&
        !dropdownOutsideRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickedDropdownOutside);

    return () => {
      window.removeEventListener("click", handleClickedDropdownOutside);
    };
  }, []);

  // 로고 클릭 시 '/main'으로 이동 & 위치가 '/main'일 경우 새로고침
  const clickedLogo = () => {
    navigate("/main");
    if (location.pathname === "/main") {
      window.location.reload();
    }
  };

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 fixed w-full h-16 z-20 top-0 start-0 border-b border-blue-600 text-white">
      <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto">
        {/* 좌측 */}
        <div className="flex items-center px-5">
          {/* 로고 */}
          <button className="pr-5 py-2">
            <LogoSVG onClick={clickedLogo} />
          </button>

          {/* 건물 목록 드롭다운 */}
          <div className="relative min-w-[10rem]" ref={dropdownOutsideRef}>
            <button
              className="flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-md"
              onClick={toggleDropdown}
            >
              {selectedBuilding !== null
                ? buildings[selectedBuilding].name // 선택된 건물 이름
                : "가온관"}
              <AngleDownSVG className="ml-2" fill="#ffffff" />
            </button>

            {/* 드롭다운 상태일 때 */}
            {isOpen && (
              <div className="absolute w-40 bg-white text-black rounded-md shadow-lg">
                {buildings.map((building, index) => (
                  <button
                    key={index}
                    className="block my-1 p-3 w-full text-center hover:bg-blue-400 hover:text-white rounded-md"
                    onClick={() => {
                      setSelectedBuilding(index); // 선택한 건물 업데이트
                      setSelectedFloor(null); // 건물 층수 초기화
                      setIsOpen(false); // 드롭다운 닫기
                    }}
                  >
                    {building.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 검색 입력창 */}
        {/* 검색 입력창 (경로가 /search가 아닐 때만 렌더링) */}
        {location.pathname !== "/search" && (
          <div className="flex">
            <form className="flex items-center space-x-2 ml-1">
              <input
                type="text"
                onClick={() => navigate("/search")}
                placeholder="사물함 번호를 입력하세요"
                className="p-2 rounded-md bg-white text-black focus:outline-none w-80"
              />
              <button type="submit">
                <SearchSVG />
              </button>
            </form>
          </div>
        )}

        {/* 우측 */}
        {/* 프로필 페이지로 들어갈 수 있는 아이콘 */}
        <button className="mr-2 p-2 bg-blue-600 hover:bg-blue-500/70 rounded-md focus:outline-none items-center">
          My Page
        </button>
      </div>
    </nav>
  );
};

export default SideNavigationLayout;
