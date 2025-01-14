import { useLocation, useNavigate } from "react-router";
import { useLogout } from "@/hooks/useLogout";
import HistorySVG from "@/icons/log.svg?react";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import LogoutSVG from "@/icons/logout.svg?react";

const CabinetFooterMenuButton = () => {
  const navigate = useNavigate();
  const locatedPage = useLocation();
  const isHistoryPage: boolean = locatedPage.pathname === "/history";

  const { handleLogout } = useLogout();

  return (
    <div className="absolute bottom-4 w-full flex flex-col items-center text-gray-500">
      <SubmitAndNavigateButton
        onClick={() => navigate("/history")}
        className={`flex flex-col items-center p-4 rounded-md transition-all duration-150 ${
          isHistoryPage
            ? "bg-blue-50 text-blue-600"
            : "hover:bg-blue-600 hover:text-white"
        }`}
        text={"History"}
        svgComponent={<HistorySVG className="mb-1 inline-block text-center" />}
      ></SubmitAndNavigateButton>
      <SubmitAndNavigateButton
        onClick={handleLogout}
        className={
          "flex flex-col items-center p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150"
        }
        text={"Logout"}
        svgComponent={<LogoutSVG className="mb-1 text-center" />}
      ></SubmitAndNavigateButton>
    </div>
  );
};

export default CabinetFooterMenuButton;
