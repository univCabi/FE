import { useNavigate } from "react-router";
import LogoSVG from "@/icons/cabiLogo.svg?react";
const ErrorCompoenent = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-blue-400">
      <h1 className="text-5xl sl:text-7xl font-bold text-white mb-5">
        404 Not Found
      </h1>
      {/* SVG 아이콘 크기 조정 */}
      <LogoSVG className="w-32 h-32 sl:w-64 sl:h-64 mb-5 animate-spin" />
      <p className="text-lg sl:text-xl text-white mb-2">
        원하시는 페이지를 찾을 수 없습니다.
      </p>
      <p className="text-sm sl:text-base text-white mb-5">
        요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다 :(
      </p>
      {/* 홈으로 이동 버튼 */}
      <button
        onClick={() => navigate("./main")}
        className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default ErrorCompoenent;
