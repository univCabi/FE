// 검색 페이지 - 첫 화면 (아무 검색어도 없을 때 보이는 View)
import LogoSVG from "@/icons/cabiLogo.svg?react";

const DefaultSearchLayout = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center space-y-4">
        <LogoSVG width={40} height={50} />
        <p>사물함 번호를 입력하세요</p>
      </div>
    </div>
  );
};
export default DefaultSearchLayout;
