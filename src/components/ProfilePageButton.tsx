import React from "react";
import { useLocation } from "react-router-dom";
import ProfileSVG from "@/icons/profile.svg?react";

interface ProfilePageButtonProps {
  onClick: () => void;
}
const ProfilePageButton = ({ onClick }: ProfilePageButtonProps) => {
  const location = useLocation();
  const isProfilePage: boolean = location.pathname === "/profile";

  return (
    <button
      onClick={onClick}
      className={`mr-2 p-2 rounded-md focus:outline-none hover:bg-blue-500 ${
        isProfilePage ? "bg-blue-500" : "bg-blue-600"
      }`}
    >
      <ProfileSVG />
    </button>
  );
};

export default ProfilePageButton;
