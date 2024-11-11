// 좌측 하단 메뉴

import LogSVG from "@/icons/log.svg?react";
import SearchSVG from "@/icons/search.svg?react";
import LogoutSVG from "@/icons/logout.svg?react";
import CabinetSVG from "@/icons/cabinet.svg?react";
import { useNavigate, useLocation } from "react-router";
import { useLogout } from "@/hooks/useLogout";
const CabinetFooterMenuButton = () => {
  // SearchPage로 이동
  const nav = useNavigate();
  // SearchPage로 이동하면 'search' 버튼의 색상이 변경(현재 위치 파악용)
  const locatedPage = useLocation();
  const isSearchPage = locatedPage.pathname === "/search";
  const isHistoryPage = locatedPage.pathname === "/history";
  const { handleLogout } = useLogout();
  return (
    <div className="absolute bottom-4 w-full flex flex-col items-center text-gray-500">
      <button
        onClick={() => nav("/search")}
        className={`flex flex-col items-center p-4 rounded-md transition-all duration-150 ${
          isSearchPage
            ? "bg-blue-50 text-blue-600"
            : "hover:bg-blue-600 hover:text-white"
        }`}
      >
        <SearchSVG className="mb-1 inline-block text-center" />
        Search
      </button>
      <button
        onClick={() => nav("/history")}
        className={`flex flex-col items-center p-4 rounded-md transition-all duration-150 ${
          isHistoryPage
            ? "bg-blue-50 text-blue-600"
            : "hover:bg-blue-600 hover:text-white"
        }`}
      >
        <LogSVG className="mb-1 inline-block text-center" />
        History
      </button>
      <button className="flex flex-col items-center p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150">
        <CabinetSVG
          className="mb-1 inline-block text-center"
          height="24"
          width="24"
        />
        Available
      </button>
      <button
        onClick={handleLogout}
        className="flex flex-col items-center p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150"
      >
        <LogoutSVG className="mb-1 text-center" />
        Logout
      </button>
    </div>
  );
};

export default CabinetFooterMenuButton;
