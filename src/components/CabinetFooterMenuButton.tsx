import React from "react";
import { useLocation, useNavigate } from "react-router";
import SubmitAndNavigateButton from "@/components/SubmitAndNavigateButton";
import { useLogout } from "@/hooks/useLogout";
import HistorySVG from "@/icons/log.svg?react";
import LogoutSVG from "@/icons/logout.svg?react";

const CabinetFooterMenuButton = React.memo(() => {
  const navigate = useNavigate();
  const locatedPage = useLocation();
  const isHistoryPage: boolean = locatedPage.pathname === "/history";

  const { handleLogout } = useLogout();

  return (
    <div className="absolute bottom-4 w-full flex flex-col items-center text-gray-500">
      {!location.pathname.startsWith("/admin") && (
        <SubmitAndNavigateButton
          onClick={() => navigate("/history")}
          className={`button-side-icon-basic ${
            isHistoryPage ? "button-side-icon-after" : "button-side-icon-before"
          }`}
          text={"History"}
          svgComponent={
            <HistorySVG className="mb-1 inline-block text-center" />
          }
        ></SubmitAndNavigateButton>
      )}

      <SubmitAndNavigateButton
        onClick={handleLogout}
        className={"button-side-icon-basic button-side-icon-before"}
        text={"Logout"}
        svgComponent={<LogoutSVG className="mb-1 text-center" />}
      ></SubmitAndNavigateButton>
    </div>
  );
});

export default CabinetFooterMenuButton;
