const CabinetInfo = () => {
  return (
    <div className="flex flex-row absolute bottom-5 left-5">
      <div className="px-2 flex flex-row">
        <div className="w-4 h-4 bg-lime-500 mr-2 rounded-sm" />내 사물함
      </div>
      <div className="px-2 flex flex-row">
        <div className="w-4 h-4 bg-purple-500 mr-2 rounded-sm" />
        사용 중
      </div>
      <div className="px-2 flex flex-row">
        <div className="w-4 h-4 bg-red-500 mr-2 rounded-sm" />
        반납 지연
      </div>
      <div className="px-2 flex flex-row">
        <div className="w-4 h-4 bg-gray-300 mr-2 rounded-sm" />
        이용 가능
      </div>
      <div className="px-2 flex flex-row">
        <div className="w-4 h-4 bg-gray-700 mr-2 rounded-sm" />
        사용 불가
      </div>
    </div>
  );
};

export default CabinetInfo;
