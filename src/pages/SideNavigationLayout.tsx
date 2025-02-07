import { useLocation, useNavigate } from "react-router";
import { BuildingData } from "@/types/CabinetType";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useBuildingState } from "@/hooks/useBuildingState";
import AngleDownSVG from "@/icons/angleDown.svg?react";
import LogoSVG from "@/icons/cabiLogo.svg?react";
import ProfileSVG from "@/icons/profile.svg?react";
import SearchSVG from "@/icons/search.svg?react";

interface NavBuildingProps {
  buildingList: BuildingData[]; // 건물 배열 (name과 floors 포함)
  selectedBuilding: string | null; // 선택된 건물의 인덱스 또는 null
  setSelectedBuilding: (building: string | null) => void; // 선택된 건물을 설정하는 함수
  setSelectedFloor: (floor: number | null) => void; // 선택된 층을 설정하는 함수
  selectedCabinet?: { cabinetId: number; cabinetNumber: number } | null;
  setSelectedCabinet: (
    cabinet: {
      cabinetId: number;
      cabinetNumber: number;
    } | null,
  ) => void;
}

const SideNavigationLayout = ({
  buildingList,
  selectedBuilding,
  setSelectedBuilding,
  setSelectedFloor,
  setSelectedCabinet,
}: NavBuildingProps) => {
  const { isDropdownOpen, setIsDropdownOpen, dropdownOutsideRef } =
    useBuildingState();
  const location = useLocation();
  const navigate = useNavigate(); // 한 번만 선언하면 된다.
  // 로고 클릭 시 '/main'으로 이동 & 위치가 '/main'일 경우 새로고침 -> 민웅기: clikendLogo에서 clickedMainLogo로 변경하였습니다.
  const isProfilePage: boolean = location.pathname === "/profile";
  const clickedMainLogo = () => {
    navigate("/main");
    if (location.pathname === "/main") {
      window.location.reload();
    }
  };

  // 로고 클릭시 '/profile'로 이동 $ 위치가 '/profile'일 경우 새로고침
  const clickedProfileLogo = () => {
    navigate("/profile");
    if (location.pathname === "/profile") {
      window.location.reload();
    }
  };

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-600 fixed w-full h-16 z-20 top-0 start-0 border-b border-blue-600 text-white">
      <div className="max-w-screen-xl h-full flex items-center justify-between mx-auto">
        {/* 좌측 */}
        <div className="flex items-center px-5">
          {/* 로고 */}
          <button className="pr-5 py-2">
            <LogoSVG onClick={clickedMainLogo} />
          </button>

          {/* 건물 목록 드롭다운 */}
          <div className="relative min-w-[10rem]" ref={dropdownOutsideRef}>
            <button
              className="flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-md"
              onClick={toggleDropdown}
            >
              {selectedBuilding ?? "가온관"}
              <AngleDownSVG className="ml-2" fill="#ffffff" />
            </button>

            {/* 드롭다운 상태일 때 */}
            {isDropdownOpen && (
              <div className="absolute w-40 bg-white text-black rounded-md shadow-lg">
                {buildingList.map((buildingData) => (
                  <button
                    key={buildingData.building}
                    className="block my-1 p-3 w-full text-center hover:bg-blue-400 hover:text-white rounded-md"
                    onClick={() => {
                      setSelectedBuilding(buildingData.building); // 선택한 건물 업데이트
                      setSelectedFloor(null); // 건물 층수 초기화
                      setSelectedCabinet(null);
                      setIsDropdownOpen(false); // 드롭다운 닫기
                    }}
                  >
                    {buildingData.building}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* 검색 입력창 */}
        {/* 검색 입력창 (경로가 /search가 아닐 때만 렌더링) */}
        {location.pathname !== "/search" && (
          <div className="hidden sm:flex">
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
        <SubmitAndNavigateButton
          onClick={clickedProfileLogo}
          className={`button-top-icon-basic ${isProfilePage ? "button-top-icon-after" : "button-top-icon-before"}`}
          svgComponent={<ProfileSVG />}
        ></SubmitAndNavigateButton>
      </div>
    </nav>
  );
};

export default SideNavigationLayout;
