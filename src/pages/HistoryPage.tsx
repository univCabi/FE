import CabinetFooterMenuButton from "@/components/CabinetFooterMenuButton";
import HistoryList from "@/components/HistoryList";
import { useHistoryData } from "@/hooks/useHistoryData";

const HistoryPage = () => {
  const { userHistoryData, setObserverRef, isScrollLoading } = useHistoryData();

  return (
    <div className="relative h-screen flex flex-col">
      {/* 메인 레이아웃 */}
      <div className="flex flex-grow">
        {/* 좌측 사이드바 */}
        <div className="absolute inset-y-0 left-0 w-40 border-r-2 border-gray-400 flex-col pt-20 hidden md:flex">
          {/* 하단 메뉴(좌측) */}
          <CabinetFooterMenuButton />
        </div>

        {/* 메인 콘텐츠 */}
        <main className="ml-0 md:ml-40 flex-grow flex flex-col items-center justify-center">
          {/* 페이지 타이틀 */}
          <div className="text-black text-4xl font-bold text-center mt-16">
            {/* hidden md:block 얘를 지워야하나 말아야하나.. */}
            사물함 대여 기록
          </div>

          {/* 히스토리 리스트 */}
          <div className="max-w-[60rem] w-[70%] max-h-[80vh] h-[90%] bg-gray-100 mt-5 border rounded-xl overflow-y-auto hidden-scrollbar shadow-lg ">
            <HistoryList
              userHistoryData={userHistoryData}
              setObserverRef={setObserverRef}
              isScrollLoading={isScrollLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;
