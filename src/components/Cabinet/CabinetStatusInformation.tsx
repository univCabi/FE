// 사물함 상태 정보

const CabinetStatusInformation = () => {
  const cabinetStatus = [
    { color: "bg-lime-500", label: "내 사물함" },
    { color: "bg-purple-500", label: "사용 중" },
    { color: "bg-red-500", label: "반납 지연" },
    { color: "bg-gray-300", label: "이용 가능" },
    { color: "bg-gray-700", label: "사용 불가" },
  ];

  return (
    <div className="flex flex-row absolute bottom-5 left-5">
      {cabinetStatus.map((status, index) => (
        <div key={index} className="px-2 flex whitespace-nowrap">
          <div className={`w-4 h-4 ${status.color} mr-2 rounded-sm`} />
          <div>{status.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CabinetStatusInformation;
