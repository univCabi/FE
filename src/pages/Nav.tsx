const Nav = ({
  buildings,
  selectedBuilding,
  setSelectedBuilding,
  setSelectedFloor,
  isOpen,
  setIsOpen,
}) => {
  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 fixed w-full h-16 z-20 top-0 start-0 border-b border-blue-600 text-white">
      <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto">
        {/* 좌측 */}
        <div className="flex items-center px-5">
          {/* 로고 */}
          <div className="pr-9 py-2">logo</div>
          {/* 건물 목록 드롭다운 */}
          <div className="relative">
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-md"
              onClick={toggleDropdown}
            >
              {selectedBuilding !== null
                ? buildings[selectedBuilding].name // 선택된 건물 이름
                : "가온관"}
              &nbsp;∨
              {/* 추후 v 대신 svg 삽입 예정 */}
            </button>

            {/* 드롭다운 상태일 때 */}
            {isOpen && (
              <div className="absolute w-40 bg-white text-black rounded-md shadow-lg">
                {buildings.map((building, index) => (
                  <button
                    key={index}
                    className="block my-1 p-3 w-full text-center hover:bg-blue-400 hover:text-white rounded-md"
                    onClick={() => {
                      setSelectedBuilding(index); // 선택한 건물 업데이트
                      setSelectedFloor(null); // 건물 층수 초기화
                      setIsOpen(false); // 드롭다운 닫기
                    }}
                  >
                    {building.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 우측 */}
        {/* 개인 페이지 들어갈 수 있는 아이콘 */}
        <button className="mr-2 p-2 bg-blue-600 hover:bg-blue-500/70 rounded-md focus:outline-none">
          My Page
        </button>
      </div>
    </nav>
  );
};

export default Nav;
