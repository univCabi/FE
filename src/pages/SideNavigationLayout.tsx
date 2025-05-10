import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { SideNavigationLayoutContext } from "@/contexts/SideNavigationLayoutContext";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useBuildingState } from "@/hooks/useBuildingState";
import { useCabinet } from "@/hooks/useCabinet";
import AngleDownSVG from "@/icons/angleDown.svg?react";
import LogoSVG from "@/icons/cabiLogo.svg?react";
import ProfileSVG from "@/icons/profile.svg?react";
import SearchSVG from "@/icons/search.svg?react";

const SideNavigationLayout = () => {
  const { buildingList, selectedBuilding, setSelectedBuilding } = useContext(
    SideNavigationLayoutContext,
  );

  const {
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownOutsideRef,
    setSelectedFloor,
  } = useBuildingState();

  const PATHS = {
    MAIN: "/main",
    ADMIN_MAIN: "/admin/main",
    SEARCH: "/search",
    ADMIN_SEARCH: "/admin/search",
  };

  const { setSelectedCabinet } = useCabinet();
  const location = useLocation();
  const navigate = useNavigate();
  const isProfilePage: boolean = location.pathname === "/profile";

  const getRedirectPath = (basePath: string) => {
    return location.pathname.startsWith("/admin")
      ? `/admin${basePath}`
      : basePath;
  };
  const searchRedirectPath = getRedirectPath(PATHS.SEARCH);
  const mainRedirectPath = getRedirectPath(PATHS.MAIN);

  const clickedMainLogo = () => {
    navigate(mainRedirectPath);
    if (
      location.pathname === PATHS.MAIN ||
      location.pathname === PATHS.ADMIN_MAIN
    ) {
      window.location.reload();
    }
  };

  // 로고 클릭시 '/profile'로 이동 & 위치가 '/profile'일 경우 새로고침 & Admin인 경우 작동 x
  const clickedProfileLogo = () => {
    if (location.pathname.startsWith("/admin")) return;
    navigate("/profile");
    if (location.pathname === "/profile") {
      window.location.reload();
    }
  };

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownBuildingSelect = (building: string) => {
    navigate(mainRedirectPath, { state: { selectedBuilding: building } });
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setSelectedBuilding(null);
  }, [location.pathname, setSelectedBuilding]);

  return (
    <nav className="bg-blue-600 fixed w-full h-16 z-20 top-0 start-0 border-b border-blue-600 text-white">
      <div className="max-w-screen-xl h-full flex items-center justify-between mx-auto">
        {/* 좌측 */}
        <div className="flex items-center px-5">
          {/* 로고 */}
          <button className="pr-5 py-2">
            <LogoSVG onClick={clickedMainLogo} width={40} height={50} />
          </button>

          {/* 건물 목록 드롭다운 */}
          <div className="relative min-w-[10rem]" ref={dropdownOutsideRef}>
            <button
              className="flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-md"
              onClick={toggleDropdown}
            >
              {selectedBuilding ?? buildingList[0].building}
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
                      dropdownBuildingSelect(buildingData.building);
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
                onClick={() => navigate(searchRedirectPath)}
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
          svgComponent={
            <ProfileSVG stroke="white" stroke-width="1.5" opacity={0.6} />
          }
        ></SubmitAndNavigateButton>
      </div>
    </nav>
  );
};

export default SideNavigationLayout;
