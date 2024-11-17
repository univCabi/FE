interface HistoryListProp {
  userHistoryData: {
    building: string;
    floor: number;
    section: string;
    cabinetNumber: number;
    startDate: string;
    endDate: string;
  }[];
}

const HistoryList = ({ userHistoryData }: HistoryListProp) => {
  return (
    <table className="w-full">
      <thead className="bg-blue-500 text-white text-xl rounded-t-lg">
        <tr>
          <th className="w-80 table-cell text-center p-5 ">위치</th>
          <th className="w-1/3 table-cell text-center p-5">대여일</th>
          <th className="w-1/3 table-cell text-center p-5">반납일</th>
        </tr>
      </thead>
      <tbody>
        {userHistoryData.map((item, index) => (
          <tr key={index} className="even:bg-gray-100">
            <td className="w-80 table-cell text-center p-5">
              {item.building}-{item.floor}-{item.cabinetNumber}-{item.section}
            </td>
            <td className="w-1/3 table-cell text-center p-5">
              {item.startDate}
            </td>
            <td className="w-1/3 table-cell text-center p-5">{item.endDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryList;
