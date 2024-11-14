import React from "react";
import { useLocation } from "react-router-dom";

interface ProfilePageButtonProps {
  onClick: () => void;
}
const ProfilePageButton = ({ onClick }: ProfilePageButtonProps) => {
  const location = useLocation();
  const isProfilePage: boolean = location.pathname === "/profile";

  return (
    <button
      onClick={onClick}
      className={`mr-2 p-2 rounded-md focus:outline-none hover:text-blue-900 ${
        isProfilePage ? "bg-blue-600 text-blue-950" : "bg-blue-600"
      }`}
    >
      My Page
    </button>
  );
};

export default ProfilePageButton;
