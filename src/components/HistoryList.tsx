interface HistoryListProp {
  userHistoryData: {
    building: string;
    floor: number;
    section: string;
    cabinetNumber: number;
    startDate: string | null;
    endDate: string | null;
  }[];
}

const HistoryList = ({ userHistoryData }: HistoryListProp) => {
  return (
    <table className="w-full ">
      <thead className="bg-blue-500 text-white text-xl rounded-t-lg sticky top-0">
        <tr>
          <th className="w-80 table-cell text-center p-5">위치</th>
          <th className="w-1/3 table-cell text-center p-5">대여일</th>
          <th className="w-1/3 table-cell text-center p-5">반납일</th>
        </tr>
      </thead>
      <tbody>
        {userHistoryData.map((item, index) => (
          <tr key={index} className="even:bg-white">
            <td className="w-80 table-cell text-center p-5 ">
              {item.building}-{item.section}-{item.cabinetNumber}-{item.floor}F
            </td>
            <td className="w-1/3 table-cell text-center p-5">
              {new Date(item.startDate || "")
                .toLocaleDateString("ko-kR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\.$/, "")}
            </td>
            <td className="w-1/3 table-cell text-center p-5">
              {new Date(item.endDate || "")
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\.$/, "")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryList;
