// 좌측 하단 메뉴

const CabinetFooterMenuButton = () => {
  return (
    <div className="absolute bottom-4 w-full flex flex-col items-center text-gray-500">
      <button className="p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150">
        Search
      </button>
      <button className="p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150">
        Log
      </button>
      <button className="p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-150">
        Logout
      </button>
    </div>
  );
};

export default CabinetFooterMenuButton;
