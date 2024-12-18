// 좌측 하단 메뉴

import LogSVG from "@/icons/log.svg?react";
import LogoutSVG from "@/icons/logout.svg?react";
// import CabinetSVG from "@/icons/cabinet.svg?react";
import { useLogout } from "@/hooks/useLogout";
import { useLocation, useNavigate } from "react-router";
const CabinetFooterMenuButton = () => {
  const navigate = useNavigate();
  const locatedPage = useLocation();
  const isHistoryPage = locatedPage.pathname === "/history";

  const { handleLogout } = useLogout();

  return (
    <div className="absolute bottom-4 w-full flex flex-col items-center text-gray-500">
      <button
        onClick={() => navigate("/history")}
        className={`flex flex-col items-center p-4 rounded-md transition-all duration-150 ${
          isHistoryPage
            ? "bg-blue-50 text-blue-600"
            : "hover:bg-blue-600 hover:text-white"
        }`}
      >
        <LogSVG className="mb-1 inline-block text-center" />
        History
      </button>
      {/* <button className="flex flex-col items-center p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150">
        <CabinetSVG
          className="mb-1 inline-block text-center"
          height="24"
          width="24"
        />
        Available
      </button> */}
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
