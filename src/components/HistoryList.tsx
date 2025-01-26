interface HistoryListProp {
  userHistoryData: {
    building: string;
    floor: number;
    section: string;
    cabinetNumber: number;
    startDate: string | null;
    endDate: string | null;
  }[];
  setObserverRef: (node: HTMLTableRowElement) => void;
}

const HistoryList = ({ userHistoryData, setObserverRef }: HistoryListProp) => {
  return (
    <table className="w-full">
      <thead className="bg-blue-500 text-white text-xl rounded-t-lg sticky z-10 top-0">
        <tr>
          <th className="w-80 table-cell text-center p-5">위치</th>
          <th className="w-1/3 table-cell text-center p-5">대여일</th>
          <th className="w-1/3 table-cell text-center p-5">반납일</th>
        </tr>
      </thead>
      <tbody>
        {userHistoryData.map((item, index) => (
          <tr
            key={index}
            ref={index === userHistoryData.length - 1 ? setObserverRef : null}
            className="even:bg-white"
          >
            <td className="w-80 table-cell text-center p-5 ">
              {item.building}-{item.section}-{item.cabinetNumber}-{item.floor}F
            </td>
            <td className="w-1/3 table-cell text-center p-5">
              {item.startDate
                ? new Date(item.startDate)
                    .toLocaleDateString("ko-kR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\.$/, "")
                : "날짜 정보를 불러올 수 없습니다."}
            </td>
            <td className="w-1/3 table-cell text-center p-5">
              {item.endDate
                ? new Date(item.endDate)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\.$/, "")
                : "날짜 정보를 불러올 수 없습니다."}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryList;
